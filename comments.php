<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<?php
$textarea = Helper::options()->commentsHTMLTagAllowed;
function threadedComments($comments, $options) {
    $commentClass = '站外';
    if ($comments->authorId) {
        if($comments->authorId == $comments->ownerId) {
            $commentClass = '作者';
        }elseif($comments->authorId == 1){
            $commentClass = '站长';
        }else{
            $commentClass = '站内';
        }
    }
    $commentLevelClass = $comments->levels > 0 ? ' comment-child' : ' comment-parent';
    $depth = $comments->levels +1;
    if ($comments->url) {
        $author = '<a href="'.$comments->url.'"target="_blank" rel="external nofollow" tooltip="'.$comments->author.'">'.$comments->author.'</a>';
    } else {
        $author = $comments->author;
    }
?>
<li id="li-<?php $comments->theId(); ?>" class="comment-body<?php
if ($depth > 1 && $depth < 3) {
    echo ' comment-child ';
    $comments->levelsAlt('comment-level-odd', ' comment-level-even');
}
else if( $depth > 2){
    echo ' comment-child2';
    $comments->levelsAlt(' comment-level-odd', ' comment-level-even');
}
else {
    echo ' comment-parent';
}
$comments->alt(' comment-odd', ' comment-even');
?>">
    <div id="<?php $comments->theId(); ?>">
         <?php
            $host = 'https://avatar.mixcm.com';
            $url = '/gravatar/';
            $size = '100';
            $rating = Helper::options()->commentsAvatarRating;
            $hash = md5(strtolower($comments->mail));
            $email = strtolower($comments->mail);
            $sjtx = Typecho_Widget::widget('Widget_Options')->motx;
            $qq = str_replace('@qq.com','',$email);
            if(strstr($email,"qq.com") && is_numeric($qq)){
              $avatar = 'https://avatar.mixcm.com/qq/'.$qq.'?s=100';
            }else{
              $avatar = $host.$url.$hash.'?s='.$size.'&r='.$rating.'&d='.$sjtx;
            }
        ?>
        <div class="comment-view">
            <div class="comment-header">
                <a href="<?php echo $comments->url; ?>"target="_blank" rel="external nofollow"><img class="avatar" src="<?php echo $avatar ?>"></a>
            </div>
            <div class="comment-content">
                <div class="comment-meta">
                    <span class="comment-author mdui-ripple"><?php echo $author; ?></span>
                    <span class="comment-time mdui-ripple" mdui-tooltip="{content: '<?php $comments->date('Y年n月j日 H:i'); ?>'}">
                        <p><?php $comments->date('n月'); ?></p><p><?php $comments->date('j日'); ?></p>
                    </span>
                    <span  class="comment-os mdui-ripple"><?php echo get_useragent_info ($comments->agent,"os"); ?></span>
                    <span  class="comment-browser mdui-ripple"><?php echo get_useragent_info ($comments->agent,"browser"); ?></span>
                    <span class="comment-reply mdui-ripple" data-no-instant><?php $comments->reply('回复'); ?></span>
                    <!--<?php $comments->sequence(); ?>--> 
                </div>
                <div class="comment-text">
                <?php 
                $url = Helper::options()->themeUrl;
                get_comment_at($comments->coid);
                $str = $comments->content;
                $str = preg_replace('#<p>#','',$str);
                $str = preg_replace('#</p>#','',$str);
                preg_match_all('/<img src="([^<]*)">/i',$str,$matchAll);
                $str = preg_replace('#<img src="(.*?)">#','',$str);
                $str = preg_replace('#\@\((.*?)\)#',"<img src='$url/newpaopao/$1.png' class='biaoqing'>",$str);
                echo $str;
                echo '<div class="catui-gallery">';
                foreach($matchAll[1] as $pic){
                    echo '<a data-fancybox="gallery" href="'.$pic.'"><img src="'.$pic.'"></a>';
                }
                echo '</div>';
                ?>
                </div>
            </div>
        </div>
    </div>
    <?php if ($comments->children) { ?>
        <div class="comment-children">
            <?php $comments->threadedComments($options); ?>
        </div>
    <?php } ?>
</li>
<?php } ?>


<div class="comment">
    <h1 class="icon icon-bubbles"> <?php $this->commentsNum('%d'); ?> 评论</h1>
    <?php $this->comments()->to($comments); ?>
    <?php if($this->allow('comment')): ?>
    <div class="comment-respond" id="<?php $this->respondId(); ?>">
        <div class="cancel-comment-reply" data-no-instant>
        <?php $comments->cancelReply(); ?>
        </div>
    	<form class="comment-form"  method="post" action="<?php $this->commentUrl() ?>" id="comment-form" role="form">
            <textarea name="text" id="textarea" placeholder='支持 Markdown'><?php $this->remember('text'); ?></textarea>
            <div class="comment-form-tab">
                <a mdui-tooltip="{content: '表情'}" class="mdui-ripple nexmoefont icon-emoji" onclick="get_sider_catui_item_fixed('OwO');"></a>
                <a mdui-tooltip="{content: '添加图片'}" class="mdui-ripple nexmoefont icon-cameraadd"></a>
                <button class="mdui-ripple" type="submit" id="comment-btn"><i class="mdui-icon material-icons">send</i></button>
            </div>
            <?php if($this->user->hasLogin()): ?>
            <?php else: ?>
    		<input type="text" name="author" id="author" class="text" placeholder="称呼" value="<?php $this->remember('author'); ?>">
    		
    		<?php if ($this->options->commentsRequireMail): ?>
    	    <input type="email" name="mail" id="mail" class="text" placeholder="Email" value="<?php $this->remember('mail'); ?>">
    	    <?php endif; ?>
    	    
    	    <?php if ($this->options->commentsRequireURL): ?>
    		<input type="url" name="url" id="url" class="text" placeholder="http://" value="<?php $this->remember('url'); ?>">
    		<?php endif; ?>
    		
            <?php endif; ?>
    	</form>
    </div>
    
    <?php else: ?>
    <h1><?php _e('评论已关闭'); ?></h1>
    <?php endif; ?>
    <?php $this->comments()->to($comments); ?>
    <?php if ($comments->have()): ?>
    
    <?php $comments->listComments(); ?>

    <?php $comments->pageNav('&laquo; 前一页', '后一页 &raquo;'); ?>
    
    <?php endif; ?>
</div><!-- .comment -->

<script type="text/javascript">  
(function () {
    window.TypechoComment = {
        dom : function (id) {
            return document.getElementById(id);
        },
        create : function (tag, attr) {
            var el = document.createElement(tag);
            for (var key in attr) {
                el.setAttribute(key, attr[key]);
            }
            return el;
        },
        reply : function (cid, coid) {
            var comment = this.dom(cid), parent = comment.parentNode,
                response = this.dom('<?php echo $this->respondId(); ?>'),
                input = this.dom('comment-parent'),
                form = 'form' == response.tagName ? response : response.getElementsByTagName('form')[0],
                textarea = response.getElementsByTagName('textarea')[0];
            if (null == input) {
                input = this.create('input', {
                    'type' : 'hidden',
                    'name' : 'parent',
                    'id'   : 'comment-parent'
                });
                form.appendChild(input);
            }
            input.setAttribute('value', coid);
            if (null == this.dom('comment-form-place-holder')) {
                var holder = this.create('div', {
                    'id' : 'comment-form-place-holder'
                });
                response.parentNode.insertBefore(holder, response);
            }
            comment.appendChild(response);
            this.dom('cancel-comment-reply-link').style.display = '';
            if (null != textarea && 'text' == textarea.name) {
                textarea.focus();
            }
            return false;
        },
        cancelReply : function () {
            var response = this.dom('<?php echo $this->respondId(); ?>'),
            holder = this.dom('comment-form-place-holder'),
            input = this.dom('comment-parent');
            if (null != input) {
                input.parentNode.removeChild(input);
            }
            if (null == holder) {
                return true;
            }
            this.dom('cancel-comment-reply-link').style.display = 'none';
            holder.parentNode.insertBefore(response, holder);
            return false;
        }
    };
})();
</script>