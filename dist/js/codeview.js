//重新渲染表单
function renderForm() {
    layui.use('form', function () {
        var form = layui.form;
        form.render('select');
        form.render();
    });
}

function rendercssbackgroundcolor(color) {

    layui.use('colorpicker', function () {
        var colorpicker = layui.colorpicker;
        //渲染
        //预定义颜色项,背景色
        colorpicker.render({
            elem: '#color-select',
            color: color

            ,
            predefine: true // 开启预定义颜色
            ,
            done: function (color) {

                var selectid = document.getElementById("el_selectid").value;

                document.getElementById(selectid).style.background = color;

                color || this.change(color); //清空时执行 change
            },
            change: function (color) {
                //给当前页面头部和左侧设置主题色
                $('.header-demo,.layui-side .layui-nav').css('background-color', color);
            }
        });
    });
}

function rendercsscolor(color) {
    layui.use('colorpicker', function () {
        var colorpicker = layui.colorpicker;
        //渲染
        //预定义颜色项，前景色
        colorpicker.render({
            elem: '#fontcolor-select',
            color: color,
            predefine: true, // 开启预定义颜色
            done: function (color) {
                var selectid = document.getElementById("el_selectid").value;
                document.getElementById(selectid).style.color = color;
                color || this.change(color); //清空时执行 change
            },
            change: function (color) {
                //给当前页面头部和左侧设置主题色
                $('.header-demo,.layui-side .layui-nav').css('background-color', color);
            }
        });
    });
}

function rendercolor(id, color, prop) {
    layui.use('colorpicker', function () {
        var colorpicker = layui.colorpicker;
        //渲染
        colorpicker.render({
            elem: id,
            color: color,
            predefine: true, // 开启预定义颜色
            done: function (color) {
                var selectid = document.getElementById("el_selectid").value;
                var el = $("#" + selectid);
                $(el).attr(prop, color);

                color || this.change(color); //清空时执行 change
            },
            change: function (color) {
                //给当前页面头部和左侧设置主题色
                $('.header-demo,.layui-side .layui-nav').css('background-color', color);
            }
        });
    });
}

function fun() {
    var val = document.getElementById("val").value;
    document.getElementById("test").value = val;
}

function show() {
    var reader = new FileReader();
    reader.onload = function () {
        document.getElementById("canvas").innerHTML = this.result;
    }
    var f = document.getElementById("filePicker").files[0];
    // document.form1.path.value=document.form1.filePicker.value;
    reader.readAsText(f);
}

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

function downloadpython(filename, value, mimeType) {
    var elHtml = value;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

/********************显示python代码****************************/
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "default"
});

$("#btn_div_save").click(function () {
    var fileName = 'tags.bin';
    downloadInnerHtml(fileName, 'canvas', 'text/html');
});

$("#srccodeclose").click(function () {
    document.getElementById("srccode").style.display = "none"; //显
});

$("#srccodecopy").click(function () {
    var value = $('#code').val();
    copyUtil(value);
    //Gcopy(value);
});


//btn_div_visual

$("#btn_div_visual1").click(function () {

    $("#srccode").css('z-index',97);
    $("#canvas").css('z-index',98);

    document.getElementById("canvas").style.display = ""; //显
    document.getElementById("codecontent").style.display = "none"; //不显

    var width = $("#srccode").css('width');
    var height = $("#srccode").css('height');
    var top = $("#srccode").css('top');
    var left = $("#srccode").css('left');

    $("#canvas").css('top',top);
    $("#canvas").css('left',left);

    $(".btn-action").removeClass('active');
    $(".visual").addClass('active');
});


$("#btn_div_display1").click(function () {
    
    $("#srccode").css('z-index',98);
    $("#canvas").css('z-index',97);

    document.getElementById("canvas").style.display = "none"; //显
    document.getElementById("codecontent").style.display = ""; //显

    var width = $("#canvas").css('width');
    var height = $("#canvas").css('height');
    var top = $("#canvas").css('top');
    var left = $("#canvas").css('left');

    $('#code').val("");

    editor.setSize(width, height);

    $("#srccode").css('width',width-5);
    $("#srccode").css('height',height-5);
    $("#srccode").css('top',top);
    $("#srccode").css('left',left);

    $(".btn-action").removeClass('active');
    $(".python").addClass('active');
    
    GPyMainWin();
    GPychild();
    GPychildcommand();
    GPyMain();
    editor.setValue($('#code').val());
});

$("#btn_py_save").click(function () {
    $('#code').val("");
    GPyMainWin();
    GPychild();
    GPychildcommand();
    GPyMain();
    editor.setValue($('#code').val());
    var fileName = 'tags.py';
    var value = $('#code').val();
    downloadpython(fileName, value, 'text/html');
});

//判断字符是否为空的方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

function fact(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * fact(num - 1);
    }
}

//布局有三种方式： 第一：绝对位置 第二：相对位置 第三：表格
function GPyMainWin() {
    //計算DIV---python
    //先獲取主窗體的信息， width、height、title、resizable（设置窗口是否可以变化长 宽）
    var mainWin = new Object;

    mainWin.width  = $("#canvas").css('width');
    mainWin.height = $("#canvas").css('height');
    mainWin.title = $("#canvas").attr("el_title");

    var fulltitle = 'root.title("' + mainWin.title + '")';
    var fullwidth = "width=" + parseInt(mainWin.width);
    var fullheight = "height=" + parseInt(mainWin.height);

    //創建python語句,从最外层开始遍历。import tkinter.font as tkFont

    $('#code').val($('#code').val() + 'import tkinter as tk\r\n'); //
    $('#code').val($('#code').val() + 'import tkinter.font as tkFont\r\n'); //
    $('#code').val($('#code').val() + '\r\n'); //
    $('#code').val($('#code').val() + 'class App:' + '\r\n'); //
    $('#code').val($('#code').val() + '    def __init__(self, root):' + '\r\n'); //

    //设置窗体标题
    $('#code').val($('#code').val() + '        ' + '#setting title' + '\r\n'); //
    $('#code').val($('#code').val() + '        ' + fulltitle + '\r\n'); //

    //设置窗体大小
    $('#code').val($('#code').val() + '        ' + '#setting window size' + '\r\n'); //
    $('#code').val($('#code').val() + '        ' + fullwidth + '\r\n'); //
    $('#code').val($('#code').val() + '        ' + fullheight + '\r\n');

    $('#code').val($('#code').val() + '        screenwidth = root.winfo_screenwidth()' + '\r\n');
    $('#code').val($('#code').val() + '        screenheight = root.winfo_screenheight()' + '\r\n');
    $('#code').val($('#code').val() +
        "        alignstr = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)" +
        '\r\n');
    $('#code').val($('#code').val() + '        root.geometry(alignstr)' + '\r\n');

    $('#code').val($('#code').val() + '        root.resizable(width=False, height=False)' + '\r\n');

    //mainwindow setting over.
}

function RGB2Hex(color) {
    if (color == "rgba(0, 0, 0, 0)") {
        return "alfa0";
    }
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

function publicSizeGpy(id, left, top, width, height) {
    $('#code').val($('#code').val() + '        ' + id + '.place(x=' + left + ",y=" + top + ",width=" + width +
        ",height=" + height + ")" + '\r\n');
}

function publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
    disabledforeground, fontsizecontent, fg, justify, targetString, Relief) {

    var selectid = id;
    if (selectid.substring(0, 9) == "GLineEdit") { } else if (selectid.substring(0, 8) ==
        "GListBox") { } else if (selectid.substring(0, 8) == "GMessage") { } else {
            if (!isEmpty(Activebackground)) {
                $('#code').val($('#code').val() + '        ' + id + '["activebackground"] = "' + Activebackground +
                    '"\r\n');
            }
            if (!isEmpty(Activeforeground)) {
                $('#code').val($('#code').val() + '        ' + id + '["activeforeground"] = "' + Activeforeground +
                    '"\r\n');
            }
        }

    if (selectid.substring(0, 8) == "GListBox") { } else {
        if (!isEmpty(Anchor)) {
            $('#code').val($('#code').val() + '        ' + id + '["anchor"] = "' + Anchor + '"\r\n');
        }
    }

    if (!(bg == "alfa0")) {
        $('#code').val($('#code').val() + '        ' + id + '["bg"] = "' + bg + '"\r\n');
    }
    //Border
    if (!isEmpty(Border)) {
        $('#code').val($('#code').val() + '        ' + id + '["borderwidth"] = "' + Border + '"\r\n');
    }
    //cursor
    if (!isEmpty(cursor)) {
        $('#code').val($('#code').val() + '        ' + id + '["cursor"] = "' + cursor + '"\r\n');
    }
    //disabledforeground
    if (selectid.substring(0, 8) == "GMessage") { } else {
        if (!isEmpty(disabledforeground)) {
            $('#code').val($('#code').val() + '        ' + id + '["disabledforeground"] = "' +
                disabledforeground + '"\r\n');
        }
    }

    $('#code').val($('#code').val() + '        ' + fontsizecontent + '\r\n');
    $('#code').val($('#code').val() + '        ' + id + '["font"] = ft' + '\r\n');

    if (!(fg == "alfa0")) {
        $('#code').val($('#code').val() + '        ' + id + '["fg"] = "' + fg + '"\r\n');
    }

    if (justify == "flex-start") {
        $('#code').val($('#code').val() + '        ' + id + '["justify"] = "left"' + '\r\n');
    }
    if (justify == "center") {
        $('#code').val($('#code').val() + '        ' + id + '["justify"] = "center"' + '\r\n');
    }
    if (justify == "flex-end") {
        $('#code').val($('#code').val() + '        ' + id + '["justify"] = "right"' + '\r\n');
    }

    if (selectid.substring(0, 8) == "GListBox") { } else {
        $('#code').val($('#code').val() + '        ' + id + '["text"] = "' + targetString + '"\r\n');
    }
    if (!isEmpty(Relief)) {
        $('#code').val($('#code').val() + '        ' + id + '["relief"] = "' + Relief + '"\r\n');
    }

}

function checkboxGpy(id, offvalue, onvalue) {
    if (!isEmpty(offvalue)) {
        $('#code').val($('#code').val() + '        ' + id + '["offvalue"] = "' + offvalue + '"\r\n');
    }
    if (!isEmpty(onvalue)) {
        $('#code').val($('#code').val() + '        ' + id + '["onvalue"] = "' + onvalue + '"\r\n');
    }
}

function radioGpy(id, value) {
    if (!isEmpty(value)) {
        $('#code').val($('#code').val() + '        ' + id + '["value"] = "' + value + '"\r\n');
    }
}

function lineeditGpy(id, value, invalidcommand, validatecommand) {
    if (!isEmpty(value)) {
        $('#code').val($('#code').val() + '        ' + id + '["show"] = "' + value + '"\r\n');
    }

    if (!isEmpty(invalidcommand)) {
        $('#code').val($('#code').val() + '        ' + id + '["invalidcommand"] = "' + invalidcommand +
            '"\r\n');
    }

    if (!isEmpty(validatecommand)) {
        $('#code').val($('#code').val() + '        ' + id + '["validatecommand"] = "' + validatecommand +
            '"\r\n');
    }

}

function listboxGpy(id, exportselection, listvariable, selectbackground, selectborderwidth, selectforeground,
    selectmode, setgrid) {
    if (!isEmpty(exportselection)) {
        $('#code').val($('#code').val() + '        ' + id + '["exportselection"] = "' + exportselection +
            '"\r\n');
    }

    if (!isEmpty(listvariable)) {
        $('#code').val($('#code').val() + '        ' + id + '["listvariable"] = "' + listvariable + '"\r\n');
    }

    if (!isEmpty(selectbackground)) {
        $('#code').val($('#code').val() + '        ' + id + '["selectbackground"] = "' + selectbackground +
            '"\r\n');
    }

    if (!isEmpty(selectborderwidth)) {
        $('#code').val($('#code').val() + '        ' + id + '["selectborderwidth"] = "' + selectborderwidth +
            '"\r\n');
    }

    if (!isEmpty(selectforeground)) {
        $('#code').val($('#code').val() + '        ' + id + '["selectforeground"] = "' + selectforeground +
            '"\r\n');
    }

    if (!isEmpty(selectmode)) {
        $('#code').val($('#code').val() + '        ' + id + '["selectmode"] = "' + selectmode + '"\r\n');
    }

    if (!isEmpty(setgrid)) {
        $('#code').val($('#code').val() + '        ' + id + '["setgrid"] = "' + setgrid + '"\r\n');
    }
}

function GPychild() {
    //弹出区域说明输入框
    var $child = $("#canvas").children();

    for (i = 0; i < $child.length; i++) 
    {
        var id = $child[i].id; //可以根据id来区分是否是Frame,怎么才能轮询到底呢
        var el = $("#" + id);

        // size
        var width   = parseInt($(el).css("width"));
        var height  = parseInt($(el).css("height"));
        var top     = parseInt($(el).css("top"));
        var left    = parseInt($(el).css("left"));

        //content
        var Activebackground    = $(el).attr("activebackground");
        var Activeforeground    = $(el).attr("activeforeground");
        var Anchor              = $(el).attr("anchor");
        var bg                  = RGB2Hex($(el).css("background-color"));

        if ($(el).css("background-color") == "alfa0") {
            bg = "alfa0";
        }

        var Border              = document.getElementById(id).style.borderWidth;
        var cursor              = $(el).attr("tkcursor");
        var disabledforeground  = $(el).attr("disabledforeground");
        var fontsize            = parseInt($(el).css("font-size")) - 2;
        var fg                  = RGB2Hex($(el).css("color"));

        if ($(el).css("color") == "alfa0") {
            fg = "alfa0";
        }

        var justify         = $(el).css("justify-content");
        var srcString       = $(el).html();
        var y               = srcString.indexOf('<div');
        var targetString    = srcString.substring(0, y);

        var fontsizecontent = "ft = tkFont.Font(family='Times',size=" + fontsize + ")";
        var Relief          = $(el).attr("relief");

        if (id.substring(0, 6) == "GLabel") {
            //组装GLabel信息
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Label(root)" + '\r\n');

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);
        }

        if (id.substring(0, 7) == "GButton") {
            //组装GButton信息
            var command = id + "_command";

            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Button(root)" + '\r\n');

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);

            $('#code').val($('#code').val() + '        ' + id + '["command"] = self.' + id + '_command' +
                '\r\n');
        }

        if (id.substring(0, 9) == "GCheckBox") {
            //组装GButton信息
            var command = id + "_command";

            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Checkbutton(root)" + '\r\n');

            targetString1 = srcString.substring(0, y);
            var yy = targetString1.indexOf('>');
            var len = targetString1.length;
            targetString = targetString1.substring(yy + 1, len);

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);

            var offvalue = $(el).attr("offvalue");
            var onvalue = $(el).attr("onvalue");
            checkboxGpy(id, offvalue, onvalue);
            $('#code').val($('#code').val() + '        ' + id + '["command"] = self.' + id + '_command' +
                '\r\n');
        }

        //radiovalue
        if (id.substring(0, 6) == "GRadio") {
            //组装GButton信息
            var command = id + "_command";

            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Radiobutton(root)" + '\r\n');

            targetString1 = srcString.substring(0, y);
            var yy = targetString1.indexOf('>');
            var len = targetString1.length;
            targetString = targetString1.substring(yy + 1, len);

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);

            var radiovalue = $(el).attr("radiovalue");
            radioGpy(id, radiovalue);

            $('#code').val($('#code').val() + '        ' + id + '["command"] = self.' + id + '_command' +
                '\r\n');
        }
        //GLineEdit
        if (id.substring(0, 9) == "GLineEdit") {
            //组装GButton信息

            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Entry(root)" + '\r\n');

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);

            var entryshow = $(el).attr("entryshow");
            var invalidcommand = $(el).attr("invalidcommand");
            var validatecommand = $(el).attr("validatecommand");

            lineeditGpy(id, entryshow, invalidcommand, validatecommand);
        }
        //GListBox
        if (id.substring(0, 8) == "GListBox") {
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Listbox(root)" + '\r\n');

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);

            var exportselection = $(el).attr("exportselection");
            var listvariable = $(el).attr("listvariable");
            var selectbackground = $(el).attr("selectbackground");
            var selectborderwidth = $(el).attr("selectborderwidth");
            var selectforeground = $(el).attr("selectforeground");
            var selectmode = $(el).attr("selectmode");
            var setgrid = $(el).attr("setgrid");

            listboxGpy(id, exportselection, listvariable, selectbackground, selectborderwidth, selectforeground,
                selectmode, setgrid);
        }
        //GMessage
        if (id.substring(0, 8) == "GMessage") {
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '        ' + id + "=tk.Message(root)" + '\r\n');

            publicContentGpy(id, Activebackground, Activeforeground, Anchor, bg, Border, cursor,
                disabledforeground, fontsizecontent, fg, justify, targetString, Relief);
            publicSizeGpy(id, left, top, width, height);
        }

    }
}

function GPychildcommand() {
    //所有按钮给一个函数
    var $child = $("#canvas").children();

    for (i = 0; i < $child.length; i++) {
        var id = $child[i].id; //可以根据id来区分是否是Frame,怎么才能轮询到底呢
        var el = $("#" + id);
        if (id.substring(0, 7) == "GButton") {
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '    def ' + id + "_command(self):" + '\r\n');
            $('#code').val($('#code').val() + '        print("command")' + '\r\n');
            $('#code').val($('#code').val() + '\r\n');
        }

        if (id.substring(0, 9) == "GCheckBox") {
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '    def ' + id + "_command(self):" + '\r\n');
            $('#code').val($('#code').val() + '        print("command")' + '\r\n');
            $('#code').val($('#code').val() + '\r\n');
        }

        if (id.substring(0, 6) == "GRadio") {
            $('#code').val($('#code').val() + '\r\n');
            $('#code').val($('#code').val() + '    def ' + id + "_command(self):" + '\r\n');
            $('#code').val($('#code').val() + '        print("command")' + '\r\n');
            $('#code').val($('#code').val() + '\r\n');
        }

        if (id.substring(0, 9) == "GLineEdit") {
            //获取两个command

            var invalidcommand = $(el).attr("invalidcommand");
            var validatecommand = $(el).attr("validatecommand");

            if (!isEmpty(invalidcommand)) {
                $('#code').val($('#code').val() + '\r\n');
                $('#code').val($('#code').val() + '    def ' + invalidcommand + "(self):" + '\r\n');
                $('#code').val($('#code').val() + '        print("command")' + '\r\n');
            }
            if (!isEmpty(validatecommand)) {
                $('#code').val($('#code').val() + '    def ' + validatecommand + "(self):" + '\r\n');
                $('#code').val($('#code').val() + '        print("command")' + '\r\n');
                $('#code').val($('#code').val() + '\r\n');
            }
        }
    }
}

function GPyMain() {
    //Entry main
    $('#code').val($('#code').val() + 'if __name__ == "__main__":' + '\r\n');
    $('#code').val($('#code').val() + '    root = tk.Tk()' + '\r\n');
    $('#code').val($('#code').val() + '    app = App(root)' + '\r\n');
    $('#code').val($('#code').val() + '    root.mainloop()' + '\r\n');
}

function Gcopy(str) {
    let oInput = document.createElement('texterea')
    oInput.value = str
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand("Copy")
    oInput.style.display = 'none'
    document.body.removeChild(oInput)
    layer.msg('复制成功', {
        icon: 16,
        time: 1000,
        shade: [0.5, '#000', true]
    });
}

function copyUtil(info) {

    var $textArea = $('<textarea></textarea>');
    $textArea.val(info);
    $textArea.css('opacity', '0');
    $('body').append($textArea);
    $textArea.select();
    //通过执行copy指令将选中的信息复制到剪切板
    var status = document.execCommand('copy', false, null);
    $textArea.remove();
    //浏览器不支持copy指令
    if (!status) {
        status = prompt('请复制到剪切板', info);
    }
    // layer.msg('复制成功');
    alert("复制成功");
    return status;
}

layui.use('code', function () {
    layui.code(); //实际使用时，执行该方法即可。而此处注释是因为修饰器在别的js中已经执行过了
});

layui.use('element', function () {
    var element = layui.element;
});

layui.use('colorpicker', function () {
    var $ = layui.$,
        colorpicker = layui.colorpicker;

    //预定义颜色项,背景色
    colorpicker.render({
        elem: '#color-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {

            var selectid = document.getElementById("el_selectid").value;

            document.getElementById(selectid).style.background = color;
            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //预定义颜色项，前景色
    colorpicker.render({
        elem: '#fontcolor-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            document.getElementById(selectid).style.color = color;

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //预定义颜色项
    colorpicker.render({
        elem: '#activefontcolor-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            var el = $("#" + selectid);
            $(el).attr("activebackground", color);

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //预定义颜色项  disabledforeground-select Activeforeground
    colorpicker.render({
        elem: '#activecolor-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            var el = $("#" + selectid);
            $(el).attr("activeforeground", color);

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //预定义颜色项  disabledforeground-select
    colorpicker.render({
        elem: '#disabledforeground-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            var el = $("#" + selectid);
            $(el).attr("disabledforeground", color);

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    //selectbackground-select  selectforeground-select
    colorpicker.render({
        elem: '#selectbackground-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            var el = $("#" + selectid);
            $(el).attr("selectbackground", color);

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

    colorpicker.render({
        elem: '#selectforeground-select',
        color: '',
        format: 'hex',
        predefine: true // 开启预定义颜色
        ,
        done: function (color) {
            var selectid = document.getElementById("el_selectid").value;
            var el = $("#" + selectid);
            $(el).attr("selectforeground", color);

            color || this.change(color); //清空时执行 change
        },
        change: function (color) {
            //给当前页面头部和左侧设置主题色
            $('.header-demo,.layui-side .layui-nav').css('background-color', color);
        }
    });

});

layui.use('form', function () {
    var form = layui.form;
    form.on('select(test)', function (data) {
        //TODO执行自己的代码
        var selectid = document.getElementById("el_selectid").value;

        if (document.getElementById("select").value == "left") {
            document.getElementById(selectid).style.justifyContent = "flex-start";
        }
        if (document.getElementById("select").value == "center") {
            document.getElementById(selectid).style.justifyContent = "center";
        }
        if (document.getElementById("select").value == "right") {
            document.getElementById(selectid).style.justifyContent = "flex-end";
        }
    });
    //testAnchor
    form.on('select(testAnchor)', function (data) {
        //TODO执行自己的代码
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("selectAnchor").value != "") {
            $(el).attr("Anchor", document.getElementById("selectAnchor").value);
        }
    });
    //testrelief
    form.on('select(testrelief)', function (data) {
        //TODO执行自己的代码
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("selectrelief").value != "") {
            $(el).attr("relief", document.getElementById("selectrelief").value);
        }
    });

    //testcursor
    form.on('select(testcursor)', function (data) {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("selectcursor").value != "") {
            $(el).attr("tkcursor", document.getElementById("selectcursor").value);
        }
    });

    //testexportselection 
    form.on('select(testexportselection)', function (data) {

        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("selectexportselection").value != "") {
            $(el).attr("exportselection", document.getElementById("selectexportselection")
                .value);
        }
        form.render('select');
        layui.form.render();
    });

    //selectmode
    form.on('select(testselectmode)', function (data) {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("listboxselectmode").value != "") {
            $(el).attr("selectmode", document.getElementById("listboxselectmode").value);
        }
    });
    //setgrid
    form.on('select(testsetgrid)', function (data) {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("listboxsetgrid").value != "") {
            $(el).attr("setgrid", document.getElementById("listboxsetgrid").value);
        }
    });

});

$(function () {

    var setHeight = $(window).height() - 64;
    $(".main-warper").css("height", setHeight);

    //初始化计数器
    var num = 0;
    //区块锁定标识
    var lock = false;

    var str = localStorage.getItem('visualpydata');//根据key值获取localStorage存储的值，此时是json字符串

    if (!isEmpty(str)) {
        //如果不为空就操作,弹出对话框 
        //document.getElementById("canvas").innerHTML = str;
        if (confirm("Resume last editing session?")) {
            var width = localStorage.getItem('visualpydata-width', width);
            var height = localStorage.getItem('visualpydata-height', height);
            document.getElementById("canvas").innerHTML = str;

            document.getElementById("canvas").style.width = width;
            document.getElementById("canvas").style.height = height;

        }
        else {
            localStorage.setItem('visualpydata', "");
        }
    }

    //srccode 移动位置
    $("#srccode").mousedown(function (e) {
        var srccode = $(this);
        var canvas  = $("#canvas");
        e.preventDefault();
        var pos     = $(this).position();
        this.posix = {
            'x': e.pageX - pos.left,
            'y': e.pageY - pos.top
        };

        $.extend(document, {
            'move': true,
            'move_target': this,
            'call_down': function (e, posix) {
                srccode.css({
                    'cursor': 'default',
                    'top': e.pageY - posix.y,
                    'left': e.pageX - posix.x
                });
                canvas.css({
                    'cursor': 'default',
                    'top': e.pageY - posix.y,
                    'left': e.pageX - posix.x
                });
            },
            'call_up': function () {
                srccode.css('cursor', 'default');
            }
        });
    });

    //Size 计算元素的位置
    $('#el_width').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.width = document.getElementById("el_width").value;
    });

    $('#el_height').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.height = document.getElementById("el_height").value;
    });

    $('#el_top').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.top = document.getElementById("el_top").value;
    });

    $('#el_left').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.left = document.getElementById("el_left").value;
    });
    //end 计算元素的位置
    /**/
    $('#el_selectcontent').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        //这里需要判断一下，根据不同的类型显示的不同
        if (selectid.substring(0, 9) == "GCheckBox") {
            $(document.getElementById(selectid)).html(
                '<input type="checkbox" name="checkbox_ico" style="width: 25;height:15">' +
                document.getElementById("el_selectcontent").value +
                '<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>');
        } else if (selectid.substring(0, 6) == "GRadio") {
            $(document.getElementById(selectid)).html(
                '<input type="radio"  style="width: 25;height:15"/>' + document
                    .getElementById("el_selectcontent").value +
                '<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>');
        } else {
            $(document.getElementById(selectid)).html(document.getElementById(
                "el_selectcontent").value +
                '<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>');
        }
    });

    $('#el_selectfontsize').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.fontSize = document.getElementById(
            "el_selectfontsize").value;
    });

    $('#el_borderwidth').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        document.getElementById(selectid).style.borderWidth = document.getElementById(
            "el_borderwidth").value;
    });

    //windows title
    $('#el_title').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        $(el).attr("el_title", document.getElementById("el_title").value);
    });
    
    //checkbox 属性 el_CheckBoxoffvalue
    $('#el_CheckBoxoffvalue').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_CheckBoxoffvalue").value != "") {
            $(el).attr("offvalue", document.getElementById("el_CheckBoxoffvalue").value);
        }

    });

    $('#el_CheckBoxonvalue').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_CheckBoxonvalue").value != "") {
            $(el).attr("onvalue", document.getElementById("el_CheckBoxonvalue").value);
        }
    });

    //el_radiobuttonvalue
    $('#el_radiobuttonvalue').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_radiobuttonvalue").value != "") {
            $(el).attr("radiovalue", document.getElementById("el_radiobuttonvalue").value);
        }
    });

    //Entry***********************************
    //el_entryshow entryshow el_invalidcommand invalidcommand el_validatecommand validatecommand
    $('#el_entryshow').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_entryshow").value != "") {
            $(el).attr("entryshow", document.getElementById("el_entryshow").value);
        }
    });
    //el_invalidcommand
    $('#el_invalidcommand').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_invalidcommand").value != "") {
            $(el).attr("invalidcommand", document.getElementById("el_invalidcommand").value);
        }
    });
    //el_validatecommand
    $('#el_validatecommand').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_validatecommand").value != "") {
            $(el).attr("validatecommand", document.getElementById("el_validatecommand").value);
        }
    });

    //listbox el_listvariable el_selectborderwidth
    $('#el_listvariable').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_listvariable").value != "") {
            $(el).attr("listvariable", document.getElementById("el_listvariable").value);
        }
    });

    //el_selectborderwidth
    $('#el_selectborderwidth').bind('input propertychange', function () {
        var selectid = document.getElementById("el_selectid").value;
        var el = $("#" + selectid);
        if (document.getElementById("el_selectborderwidth").value != "") {
            $(el).attr("selectborderwidth", document.getElementById("el_selectborderwidth")
                .value);
        }
    });

    //canvas 移动位置
    $("#canvas").mousedown(function (e) {

        var srccode = $("#srccode");
        var canvas = $(this);
        e.preventDefault();
        var pos = $(this).position();
        this.posix = {
            'x': e.pageX - pos.left,
            'y': e.pageY - pos.top
        };

        $.extend(document, {
            'move': true,
            'move_target': this,
            'call_down': function (e, posix) {
                canvas.css({
                    'cursor': 'default',
                    'top': e.pageY - posix.y,
                    'left': e.pageX - posix.x
                });
                srccode.css({
                    'cursor': 'default',
                    'top': e.pageY - posix.y,
                    'left': e.pageX - posix.x
                });
            },
            'call_up': function () {
                canvas.css('cursor', 'default');
            }
        });
        if (e.which == 3) {
            document.getElementById($(this).attr('id')).click();
        }

        //保存一下操作 localStorage.setItem('data',str);
        var str = document.getElementById("canvas").innerHTML;
        localStorage.setItem('visualpydata', str);

        var width = document.getElementById("canvas").style.width;
        var height = document.getElementById("canvas").style.height;
        localStorage.setItem('visualpydata-width', width);
        localStorage.setItem('visualpydata-height', height);


        e.stopPropagation();

    }).on('mousedown', '.coor', function (e) {
        var $box = $(this).parent();

        var srccode = $("#srccode");

        var posix = {
            'w': $box.width(),
            'h': $box.height(),
            'x': e.pageX,
            'y': e.pageY
        };
        $.extend(document, {
            'move': true,
            'call_down': function (e) {
                $box.css({
                    'width': Math.max(30, e.pageX - posix.x + posix.w),
                    'height': Math.max(30, e.pageY - posix.y + posix.h)
                });

                srccode.css({
                    'width': Math.max(30, e.pageX - posix.x + posix.w),
                    'height': Math.max(30, e.pageY - posix.y + posix.h)
                });

                document.getElementById($box.attr("id")).click();
            }
        });
        //保存一下操作 localStorage.setItem('data',str);
        var str = document.getElementById("canvas").innerHTML;
        localStorage.setItem('visualpydata', str);

        var width = document.getElementById("canvas").style.width;
        var height = document.getElementById("canvas").style.height;
        localStorage.setItem('visualpydata-width', width);
        localStorage.setItem('visualpydata-height', height);
        e.stopPropagation();
    }).on('mousedown', '.box', function (e) {
        if (lock) return;
        var $box = $(this);
        if (e.which == 1) {
            var pos = $(this).position();

            this.posix = {
                'x': e.pageX - pos.left,
                'y': e.pageY - pos.top
            };

            $.extend(document, {
                'move': true,
                'move_target': this,
                'call_down': function (e, posix) {
                    var newtop = e.pageY - posix.y;
                    var newleft = e.pageX - posix.x;
                    //68-->70  64-->60  
                    var ntopZ = parseInt(newtop/10)*10;
                    var ntopy = newtop%10;
                    if(ntopy>=5)
                    {
                        ntopy =10;
                    }
                    else
                    {
                        ntopy = 0;
                    }
                    var newtoptop = ntopZ + ntopy;
                
                    var nleftZ = parseInt(newleft/10)*10;
                    var nlefty = newleft%10;
                    if(nlefty>=5)
                    {
                        nlefty =10;
                    }
                    else
                    {
                        nlefty = 0;
                    }
                    var newleftleft = nleftZ + nlefty;

                    //边缘检测
                    if(newtoptop<0)
                    {
                        newtoptop = 0;
                    }

                    if(newleftleft<0)
                    {
                        newleftleft = 0;
                    }

                    // var canvaswidth   = $("#canvas").css('width');
                    // var canvasheight  = $("#canvas").css('height');

                    // var selectid = document.getElementById("el_selectid").value;
                    // var el = $("#" + selectid);
                    // var selwidth   = $(el).css('width');
                    // var selheight  = $(el).css('height');

                    // if((newleftleft + parseInt(selwidth))>=parseInt(canvaswidth))
                    // {
                    //     newleftleft = parseInt(canvaswidth) - parseInt(selwidth);
                    // }
                    // if((newtoptop + parseInt(selheight))>=parseInt(canvasheight))
                    // {
                    //     newtoptop = parseInt(canvasheight) - parseInt(selheight);
                    // }


                    $box.css({
                        'cursor': 'default',
                        'top': newtoptop,
                        'left': newleftleft
                    });
                }
            });
        } else if (e.which == 3) {
            document.getElementById($(this).attr('id')).click();
        } else {

        }

        //保存一下操作 localStorage.setItem('data',str);
        var str = document.getElementById("canvas").innerHTML;
        localStorage.setItem('visualpydata', str);

        var width = document.getElementById("canvas").style.width;
        var height = document.getElementById("canvas").style.height;
        localStorage.setItem('visualpydata-width', width);
        localStorage.setItem('visualpydata-height', height);

        e.stopPropagation();

    }).on('mousedown', '.box .coor', function (e) {

        var $box = $(this).parent();

        var posix = {
            'w': $box.width(),
            'h': $box.height(),
            'x': e.pageX,
            'y': e.pageY
        };
        $.extend(document, {
            'move': true,
            'call_down': function (e) {
                $box.css({
                    'width': Math.max(30, e.pageX - posix.x + posix.w),
                    'height': Math.max(30, e.pageY - posix.y + posix.h)
                });
                document.getElementById($box.attr("id")).click();
            }
        });
        //保存一下操作 localStorage.setItem('data',str);
        var str = document.getElementById("canvas").innerHTML;
        localStorage.setItem('visualpydata', str);

        var width = document.getElementById("canvas").style.width;
        var height = document.getElementById("canvas").style.height;
        localStorage.setItem('visualpydata-width', width);
        localStorage.setItem('visualpydata-height', height);

        e.stopPropagation();
    });

    $(document).on('click', '#canvas', function (event) {
        event.stopPropagation(); //停止事件冒泡
        var e = event.target;
        if (e.id != "canvas") {
            return;
        }

        var el      = $("#" + e.id);
        var width   = $(el).css('width');
        var height  = $(el).css('height');
        var top     = $(el).css('top');
        var left    = $(el).css('left');

        var inputwidth = document.getElementById("el_width");
        var inputheight = document.getElementById("el_height");
        var inputtop = document.getElementById("el_top");
        var inputleft = document.getElementById("el_left");
        var inputselectid = document.getElementById("el_selectid");

        inputwidth.value = width;
        inputheight.value = height;
        inputtop.value = top;
        inputleft.value = left;
        inputselectid.value = e.id;

        $("#el_selectcontent").attr("disabled", true);

        $('.coor').hide();
        $('.lefttopcoor').hide();
        $('.leftbottomcoor').hide();
        $('.righttopcoor').hide();
        $('.topcentercoor').hide();
        $('.bottomcentercoor').hide();

        $('#canvascoor').show();
        $('#windowstitle').show();

        $(".ul-context-menu").hide();

        //content
        $("#content").hide();
        $("#checkbox_attr").hide();
        $("#radiobutton_attr").hide();
        $("#entry_attr").hide();
        $("#listbox_attr").hide();
    });

    $("#canvas").on('click', '.box', function (event) {
        event.stopPropagation(); //停止事件冒泡

        $("#el_selectcontent").attr("disabled", false);

        var e = event.target;
        var el = $("#" + e.id);

        var width = document.getElementById(e.id).style.width;
        var height = document.getElementById(e.id).style.height;
        var top = document.getElementById(e.id).style.top;
        var left = document.getElementById(e.id).style.left;
        var fontsize = document.getElementById(e.id).style.fontSize;
        var borderwidth = document.getElementById(e.id).style.borderWidth;

        var inputwidth = document.getElementById("el_width");
        var inputheight = document.getElementById("el_height");
        var inputtop = document.getElementById("el_top");
        var inputleft = document.getElementById("el_left");
        var inputselectid = document.getElementById("el_selectid");

        var inputcontent = document.getElementById("el_selectcontent");

        var inputfontsize = document.getElementById("el_selectfontsize");

        var inputborderwidth = document.getElementById("el_borderwidth");

        //el_CheckBoxonvalue
        var inputcheckboxoffvalue = document.getElementById("el_CheckBoxoffvalue");
        var inputcheckboxonvalue = document.getElementById("el_CheckBoxonvalue");

        //el_radiobuttonvalue
        var inputradiobuttonvalue = document.getElementById("el_radiobuttonvalue");
        //el_entryshow entryshow el_invalidcommand invalidcommand el_validatecommand validatecommand

        var inputentryshow = document.getElementById("el_entryshow");
        var inputinvalidcommand = document.getElementById("el_invalidcommand");
        var inputvalidatecommand = document.getElementById("el_validatecommand");

        var inputselectAnchor = document.getElementById("selectAnchor");
        var inputselectcursor = document.getElementById("selectcursor");
        var inputselect = document.getElementById("select");
        var inputselectrelief = document.getElementById("selectrelief");

        //listbox 
        //selectexportselection  el_listvariable el_selectborderwidth
        var inputselectexportselection = document.getElementById("selectexportselection");
        var inputlistvariable = document.getElementById("el_listvariable");
        var inputselectborderwidth = document.getElementById("el_selectborderwidth");
        var inputlistboxtestselectmode = document.getElementById("listboxselectmode");
        var inputlistboxlistboxsetgrid = document.getElementById("listboxsetgrid");


        var srcString = $(document.getElementById(e.id)).html();

        var y = srcString.indexOf('<div');

        var targetString;
        if (e.id.substring(0, 9) == "GCheckBox") {
            targetString1 = srcString.substring(0, y);
            var yy = targetString1.indexOf('>');
            var len = targetString1.length;
            targetString = targetString1.substring(yy + 1, len);
        } else if (e.id.substring(0, 6) == "GRadio") {
            targetString1 = srcString.substring(0, y);
            var yy = targetString1.indexOf('>');
            var len = targetString1.length;
            targetString = targetString1.substring(yy + 1, len);
        } else {
            targetString = srcString.substring(0, y);
        }

        inputcontent.value = targetString;

        inputwidth.value = width;
        inputheight.value = height;
        inputtop.value = top;
        inputleft.value = left;
        inputselectid.value = e.id;

        inputfontsize.value = fontsize;
        inputborderwidth.value = borderwidth;

        inputcheckboxoffvalue.value = $(el).attr("offvalue");
        inputcheckboxonvalue.value = $(el).attr("onvalue");

        inputradiobuttonvalue.value = $(el).attr("radiovalue");

        inputentryshow.value = $(el).attr("entryshow");
        inputinvalidcommand.value = $(el).attr("invalidcommand");
        inputvalidatecommand.value = $(el).attr("validatecommand");

        //content
        var col = $(el).attr("activebackground");
        var idd = "#activefontcolor-select";
        var propactivebackground = "activebackground";
        rendercolor(idd, col, propactivebackground);

        var col = $(el).attr("activeforeground");
        var idd = "#activecolor-select";
        var propactiveforeground = "activeforeground";
        rendercolor(idd, col, propactiveforeground);

        var col = $(el).attr("disabledforeground");
        var idd = "#disabledforeground-select";
        var propdisabledforeground = "disabledforeground";
        rendercolor(idd, col, propdisabledforeground);

        rendercssbackgroundcolor($(el).css("background-color"));
        rendercsscolor($(el).css("color"));

        inputselectAnchor.value = $(el).attr("anchor");

        if ($(el).css("justifyContent") == "flex-start") {
            inputselect.value = "left";
        }
        if ($(el).css("justifyContent") == "center") {
            inputselect.value = "center";
        }
        if ($(el).css("justifyContent") == "flex-end") {
            inputselect.value = "right";
        }
        inputselectcursor.value = $(el).attr("tkcursor");
        inputselectrelief.value = $(el).attr("relief");

        //listbox
        inputlistvariable.value = $(el).attr("listvariable");
        inputselectborderwidth.value = $(el).attr("selectborderwidth");
        inputselectexportselection.value = $(el).attr("exportselection");
        inputlistboxtestselectmode.value = $(el).attr("selectmode");
        inputlistboxlistboxsetgrid.value = $(el).attr("setgrid");
        var col = $(el).attr("selectforeground");
        var idd = "#selectforeground-select";
        var propselectforeground = "selectforeground";
        rendercolor(idd, col, propselectforeground);

        var col = $(el).attr("selectbackground");
        var idd = "#selectbackground-select";
        var propselectbackground = "selectbackground";
        rendercolor(idd, col, propselectbackground);

        $('.coor').hide();
        $('.lefttopcoor').hide();
        $('.leftbottomcoor').hide();
        $('.righttopcoor').hide();
        $('.topcentercoor').hide();
        $('.bottomcentercoor').hide();

        $(document.getElementById(e.id)).find('.coor').show();
        $(document.getElementById(e.id)).find('.lefttopcoor').show();
        $(document.getElementById(e.id)).find('.leftbottomcoor').show();
        $(document.getElementById(e.id)).find('.righttopcoor').show();
        $(document.getElementById(e.id)).find('.topcentercoor').show();
        $(document.getElementById(e.id)).find('.bottomcentercoor').show();

        $(".ul-context-menu").hide();
        $('#windowstitle').hide();

        //右侧属性显示
        if (e.id.substring(0, 6) == "GLabel") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        } else if (e.id.substring(0, 7) == "GButton") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        } else if (e.id.substring(0, 9) == "GCheckBox") {
            $("#content").show();
            $("#checkbox_attr").show();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        } else if (e.id.substring(0, 6) == "GRadio") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").show();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        } else if (e.id.substring(0, 9) == "GLineEdit") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").show();
            $("#listbox_attr").hide();
        } else if (e.id.substring(0, 8) == "GListBox") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").show();
        } else if (e.id.substring(0, 8) == "GMessage") {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        } else {
            $("#content").show();
            $("#checkbox_attr").hide();
            $("#radiobutton_attr").hide();
            $("#entry_attr").hide();
            $("#listbox_attr").hide();
        }
        renderForm();
    });

    $('.coor').hide();
    $('.lefttopcoor').hide();
    $('.leftbottomcoor').hide();
    $('.righttopcoor').hide();
    $('.topcentercoor').hide();
    $('.bottomcentercoor').hide();
});

//拖拽事件
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);

    var x = ev.pageX - document.getElementById(ev.target.id).getBoundingClientRect().left;
    var y = ev.pageY - document.getElementById(ev.target.id).getBoundingClientRect().top;

    ev.dataTransfer.setData("textx", x);
    ev.dataTransfer.setData("texty", y);
}

function drop(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("Text");
    var target = document.getElementById("canvas");
    var sourceNode = document.getElementById(data); // 获得被克隆的节点对象 

    var textx = parseInt(ev.dataTransfer.getData("Textx"));
    var texty = parseInt(ev.dataTransfer.getData("Texty"));

    var canvastop = document.getElementById("canvas").getBoundingClientRect().top;
    var canvasleft = document.getElementById("canvas").getBoundingClientRect().left;

    var idd;

    if (sourceNode.id == "GLabel") //如果是原型GLabel元素
    {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = 'label<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';

        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GLabel_" + idU); // 修改一下id 值，避免id 重复   	
        clonedNode.setAttribute("class", "box");
        clonedNode.setAttribute("ondragstart", "drag(event)");
        clonedNode.setAttribute("draggable", "true");
        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GLabel_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 70);
        $(el).css('height', 25);
        $(el).css('font-size', 12);

    } else if (sourceNode.id == "GButton") {
        var clonedNode = document.createElement("button");
        clonedNode.innerHTML = 'Button<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GButton_" + idU); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("type", "button"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true"); // 修改一下id 值，避免id 重复   

        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GButton_" + idU;
        var el = $("#" + idd);
        $(el).css('width', 70);
        $(el).css('height', 25);
        $(el).css('font-size', 12);

    } //GCheckBox
    else if (sourceNode.id == "GCheckBox") {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = '<input type="checkbox" name="checkbox_ico" style="width: 25;height:15" />CheckBox<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GCheckBox_" + idU); // 修改一下id 值，避免id 重复  

        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true");
        clonedNode.setAttribute("offvalue", "0");
        clonedNode.setAttribute("onvalue", "1");

        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GCheckBox_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 70);
        $(el).css('height', 25);
        $(el).css('font-size', 12);

    } else if (sourceNode.id == "GRadio") {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = '<input type="radio" name="radio_ico" style="width: 25;height:15" />RadioButton<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GRadio_" + idU); // 修改一下id 值，避免id 重复  

        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true");

        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GRadio_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 85);
        $(el).css('height', 25);
        $(el).css('font-size', 12);

    } //GLineEdit
    else if (sourceNode.id == "GLineEdit") {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = 'Entry<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GLineEdit_" + idU); // 修改一下id 值，避免id 重复  

        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true");

        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GLineEdit_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 70);
        $(el).css('height', 25);
        $(el).css('font-size', 12);
        $(el).css('border-style', "solid");
        $(el).css('border-width', 1);
        $(el).css('border-color', "#CCCCCC");

    } //GListBox
    else if (sourceNode.id == "GListBox") {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = 'listbox<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GListBox_" + idU); // 修改一下id 值，避免id 重复  

        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true");

        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GListBox_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 80);
        $(el).css('height', 25);
        $(el).css('font-size', 12);
        $(el).css('border-style', "inset");
        $(el).css('border-width', 1);
        $(el).css('border-color', "#CCCCCC");

    } //GMessage
    else if (sourceNode.id == "GMessage") {
        var clonedNode = document.createElement("label");
        clonedNode.innerHTML = 'Message<div class="coor transparent" style="display: block;"></div><div class="lefttopcoor transparent" style="display: block;"></div><div class="leftbottomcoor transparent" style="display: block;"></div><div class="righttopcoor transparent" style="display: block;"></div><div class="topcentercoor transparent" style="display: block;"></div><div class="bottomcentercoor transparent" style="display: block;"></div>';
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GMessage_" + idU); // 修改一下id 值，避免id 重复  

        clonedNode.setAttribute("class", "box"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("ondragstart", "drag(event)"); // 修改一下id 值，避免id 重复   
        clonedNode.setAttribute("draggable", "true");
        clonedNode.setAttribute("singleline", "false");
        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GMessage_" + idU;

        var el = $("#" + idd);
        $(el).css('width', 80);
        $(el).css('height', 25);
        $(el).css('font-size', 12);
        $(el).css('border-color', "#CCCCCC");


    } //GSpinBox
    else if (sourceNode.id == "GSpinBox") {
        var clonedNode = sourceNode.cloneNode(true); // 克隆节点  
        var idU = new Date().getUTCMilliseconds();
        clonedNode.setAttribute("id", "GSpinBox_" + idU); // 修改一下id 值，避免id 重复   
        var id = clonedNode.getAttribute("id");

        $("#" + id + " " + "#right_bottom_spin").attr("id", "right_bottom_spin" + idU);
        target.appendChild(clonedNode); // 在父节点插入克隆的节点  

        idd = "GSpinBox_" + idU;

    } //GSpinBox
    else {

    }

    var newtop = parseInt(ev.pageY) - parseInt(canvastop) - texty;
    var newleft = parseInt(ev.pageX) - parseInt(canvasleft) - textx;
    //68-->70  64-->60  
    var ntopZ = parseInt(newtop/10)*10;
    var ntopy = newtop%10;
    if(ntopy>=5)
    {
        ntopy =10;
    }
    else
    {
        ntopy = 0;
    }
    var newtoptop = ntopZ + ntopy;

    var nleftZ = parseInt(newleft/10)*10;
    var nlefty = newleft%10;
    if(nlefty>=5)
    {
        nlefty =10;
    }
    else
    {
        nlefty = 0;
    }
    var newleftleft = nleftZ + nlefty;

    if(newtoptop<0)
    {
        newtoptop = 0;
    }

    if(newleftleft<0)
    {
        newleftleft = 0;
    }
    
    var el = $("#" + idd);
    $(el).css('top', newtoptop);
    $(el).css('left', newleftleft);

    document.getElementById(idd).click();

    //保存一下操作 localStorage.setItem('data',str);
    var str = document.getElementById("canvas").innerHTML;
    localStorage.setItem('visualpydata', str);

    var width = document.getElementById("canvas").style.width;
    var height = document.getElementById("canvas").style.height;
    localStorage.setItem('visualpydata-width', width);
    localStorage.setItem('visualpydata-height', height);

}

//右键信息
$("#canvas").contextMenu({
    width: 110, // width
    itemHeight: 30, // 菜单项height
    bgColor: "#333", // 背景颜色
    color: "#fff", // 字体颜色
    fontSize: 12, // 字体大小
    hoverBgColor: "#99CC66", // hover背景颜色
    target: function (ele) { // 当前元素
        console.log(ele);
    },
    menu: [{
        text: "Copier",
        icon: "./dist/img/paste.png",
        callback: function () { }
    },
    {
        text: "Supprimer",
        icon: "./dist/img/del.png",
        callback: function () {
            var selectid = document.getElementById("el_selectid").value;
            if (selectid.substring(0, 1) == "G") {
                document.getElementById(selectid).remove();
                document.getElementById("canvas").click();
            }
        }
    }
    ]
});

//实时监听屏幕大小
window.addEventListener('load', function() {
    // console.log(window.innerWidth);
    window.addEventListener('resize', function() {
        // console.log(window.innerWidth);
        var setHeight = $(window).height() - 64;
        $(".main-warper").css("height", setHeight);
    })

})