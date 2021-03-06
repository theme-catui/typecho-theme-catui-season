InstantClick.on("change", function () {
	mdui.mutation();
	loadMeting();
});
console.log(
	"\n %c  Cat UI 情托于物。人情冷暖，世态炎凉。 %c @折影轻梦<https://github.com/theme-catui/typecho-theme-catui-season> \n\n",
	"color:rgb(255, 242, 242);background:rgb(244, 164, 164);padding:5px 0;border-radius:3px 0 0 3px;",
	"color:rgb(244, 164, 164);background:rgb(255, 242, 242);padding:5px 0;border-radius:0 3px 3px 0;"
);
Smilies = {
	dom: function (a) {
		return document.getElementById(a);
	},
	showBox: function () {
		this.dom("OwO").style.display = "block";
	},
	closeBox: function () {
		this.dom("OwO").style.display = "none";
	},
	grin: function (a) {
		a = " " + a + " ";
		myField = this.dom("textarea");
		document.selection
			? (myField.focus(),
			  (sel = document.selection.createRange()),
			  (sel.text = a),
			  myField.focus())
			: this.insertTag(a);
	},
	insertTag: function (a) {
		myField = Smilies.dom("textarea");
		myField.selectionStart || myField.selectionStart == "0"
			? ((startPos = myField.selectionStart),
			  (endPos = myField.selectionEnd),
			  (cursorPos = startPos),
			  (myField.value =
					myField.value.substring(0, startPos) +
					a +
					myField.value.substring(endPos, myField.value.length)),
			  (cursorPos += a.length),
			  myField.focus(),
			  (myField.selectionStart = cursorPos),
			  (myField.selectionEnd = cursorPos))
			: ((myField.value += a), myField.focus());
	},
};
function get_sider_catui_item_fixed(c) {
	var b = document.getElementById("sider").getElementsByTagName("section");
	for (var a = 0; a < b.length; a++) {
		b[a].className = "catui-item";
		document.getElementById("sider-support").className =
			"catui-item disappear";
		document.getElementById("sider-OwO").className = "catui-item disappear";
		document.getElementById("sider-" + c).className =
			"catui-item sider-fixed";
	}
}
function get_sider_catui_item_disappear(a) {
	if (a == "support" || a == "OwO") {
		setTimeout(function () {
			document.getElementById("sider-" + a).className =
				"catui-item disappear";
		}, 200);
	} else {
		setTimeout(function () {
			document.getElementById("sider-" + a).className = "catui-item";
		}, 200);
	}
}
function getScrollTop() {
	var c = 0,
		b = 0,
		a = 0;
	if (document.body) {
		b = document.body.scrollTop;
	}
	if (document.documentElement) {
		a = document.documentElement.scrollTop;
	}
	c = b - a > 0 ? b : a;
	return c;
}
function getScrollHeight() {
	var b = 0,
		c = 0,
		a = 0;
	if (document.body) {
		c = document.body.scrollHeight;
	}
	if (document.documentElement) {
		a = document.documentElement.scrollHeight;
	}
	b = c - a > 0 ? c : a;
	return b;
}
function getWindowHeight() {
	var a = 0;
	if (document.compatMode == "CSS1Compat") {
		a = document.documentElement.clientHeight;
	} else {
		a = document.body.clientHeight;
	}
	return a;
}
window.onscroll = function () {
	var a = getWindowHeight() * 1.5;
	if (getScrollTop() + getWindowHeight() > a) {
		new mdui.Fab(".mdui-fab-fixed").show();
	} else {
		new mdui.Fab(".mdui-fab-fixed").hide();
	}
};
function get_to_top() {
	setTimeout(function () {
		new mdui.Fab(".mdui-fab-fixed").hide();
	}, 300);
	(function a() {
		var b = document.documentElement.scrollTop || document.body.scrollTop;
		if (b > 0) {
			window.requestAnimationFrame(a);
			window.scrollTo(0, b - b / 5);
		}
	})();
}
function ajaxc() {
	var m = "必须填写用户名",
		k = "必须填写电子邮箱地址",
		h = "邮箱地址不合法",
		e = "必须填写评论内容";
	$body = window.opera
		? document.compatMode == "CSS1Compat"
			? $("html")
			: $("body")
		: $("html,body");
	var l = "DESC",
		b = ".comment-list",
		i = ".comment-num",
		j = ".comment-reply",
		g = "#comment-form",
		c = "#comments",
		p = "#textarea",
		a = ".submit",
		o = "",
		n = "";
	d();
	$(g).submit(function () {
		$("#comment-btn").prop("disabled", true);
		$("#comment-btn").html('<div class="mdui-spinner"></div>');
		mdui.mutation();
		$(a).attr("disabled", true).fadeTo("slow", 0.5);
		if ($(g).find("#author")[0]) {
			if ($(g).find("#author").val() == "") {
				mdui.alert(m);
				$("#comment-btn").prop("disabled", false);
				$("#comment-btn").html(
					'<i class="mdui-icon material-icons">send</i>'
				);
				mdui.mutation();
				f("#error");
				return false;
			}
			if ($(g).find("#mail").val() == "") {
				mdui.alert(k);
				$("#comment-btn").prop("disabled", false);
				$("#comment-btn").html(
					'<i class="mdui-icon material-icons">send</i>'
				);
				mdui.mutation();
				f("#error");
				return false;
			}
			var r = /^[^@\s<&>]+@([a-z0-9]+\.)+[a-z]{2,4}$/i;
			if (!r.test($(g).find("#mail").val())) {
				mdui.alert(h);
				$("#comment-btn").prop("disabled", false);
				$("#comment-btn").html(
					'<i class="mdui-icon material-icons">send</i>'
				);
				mdui.mutation();
				f("#error");
				return false;
			}
		}
		var q = $(g)
			.find(p)
			.val()
			.replace(/(^\s*)|(\s*$)/g, "");
		if (q == null || q == "") {
			mdui.alert(e);
			$("#comment-btn").prop("disabled", false);
			$("#comment-btn").html(
				'<i class="mdui-icon material-icons">send</i>'
			);
			mdui.mutation();
			f("#error");
			console.log("内容为空");
			return false;
		}
		$(a).addClass("active");
		$("#loading").show();
		$.ajax({
			url: $(this).attr("action"),
			type: $(this).attr("method"),
			data: $(this).serializeArray(),
			error: function () {
				mdui.alert("提交失败，请重试！");
				$("#comment-btn").prop("disabled", false);
				$("#comment-btn").html(
					'<i class="mdui-icon material-icons">send</i>'
				);
				f("#error");
				return false;
			},
			success: function (u) {
				$(a).removeClass("active");
				$("#loading").slideUp();
				try {
					if (!$(b, u).length) {
						mdui.alert("提交失败,可能输入内容不符合规则！");
						$("#comment-btn").prop("disabled", false);
						$("#comment-btn").html(
							'<i class="mdui-icon material-icons">send</i>'
						);
						f("#error");
						return false;
					} else {
						o = $(b, u)
							.html()
							.match(/id=\"?comment-\d+/g)
							.join()
							.match(/\d+/g)
							.sort(function (x, w) {
								return x - w;
							})
							.pop();
						if ($(".page-navigator .prev").length && n == "") {
							o = "";
							var s = $(".prev a").attr("href");
							$(".prev a").attr("href", "");
							s = s.replace(
								/comment-page-(.*?)#comments/,
								"comment-page-1#comments"
							);
							$(".prev a").attr("href", s);
							$(".prev a").get(0).click();
						}
						console.log("new id " + o);
						f("#success");
						if (n) {
							u = $("#li-comment-" + o, u).hide();
							if (
								$("#" + n).find(".comment-children").length <= 0
							) {
								$("#" + n).append(
									"<div class='comment-children'><ol class='comment-list'></ol></div>"
								);
							}
							if (o) {
								$(
									"#" + n + " .comment-children .comment-list"
								).prepend(u);
							}
							console.log("该评论为子评论,parent_id:" + n);
							n = "";
						} else {
							u = $("#li-comment-" + o, u).hide();
							if (!$(b).length) {
								$(c).append(
									'<div class="info-com">仅有<span class="comment-num">0</span>条评论</div><ol class="comment-list"></ol>'
								);
							}
							$(b).prepend(u);
						}
						$("#li-comment-" + o).fadeIn();
						var t;
						$(i).length
							? ((t = parseInt($(i).text().match(/\d+/))),
							  $(i).html(
									$(i)
										.html()
										.replace(t, t + 1)
							  ))
							: 0;
						TypechoComment.cancelReply();
						$(p).val("");
						$(j + " a, #cancel-comment-reply-link").unbind("click");
						d();
						$(a).attr("disabled", false).fadeTo("slow", 1);
						if (o) {
							$body.animate(
								{
									scrollTop:
										$("#li-comment-" + o).offset().top - 50,
								},
								500
							);
						} else {
							$body.animate(
								{ scrollTop: $("#comments").offset().top - 50 },
								500
							);
						}
						$("#comment-btn").prop("disabled", false);
						$("#comment-btn").html(
							'<i class="mdui-icon material-icons">send</i>'
						);
					}
				} catch (v) {
					window.location.reload();
				}
			},
		});
		return false;
	});
	function d() {
		$(j + " a").click(function () {
			n = n = $(this)
				.parent()
				.parent()
				.parent()
				.parent()
				.parent()
				.attr("id");
			console.log("parent_id:" + n);
			$(p).focus();
		});
		$("#cancel-comment-reply-link").click(function () {
			n = "";
		});
	}
	function f(q) {
		$(a).attr("disabled", false).fadeTo("", 1);
	}
}
ajaxc();
