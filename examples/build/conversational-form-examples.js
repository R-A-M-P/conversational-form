// Docs version 1.0.0
// declare module cf{
// 	
// }
// interface cf{
// 	ConversationalForm: any;
// }
// export type ConversationalForm = any;
// interface ConversationalForm = any;
// declare var ConversationalForm: any;
var ConversationalForm = (function () {
    function ConversationalForm() {
    }
    return ConversationalForm;
}());
var ConversationalFormDocs = (function () {
    function ConversationalFormDocs() {
        this.introTimer = 0;
        this.el = document.querySelector("main.content");
        this.h1writer = new H1Writer({
            el: document.getElementById("writer")
        });
        var isMenuVisible = window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display") != "none";
        if (isMenuVisible)
            this.introFlow1();
        else
            this.introFlow2();
    }
    /**
    * @name introFlow1
    * flow for small screens
    */
    ConversationalFormDocs.prototype.introFlow1 = function () {
        var _this = this;
        this.introTimer = setTimeout(function () {
            _this.toggleMenuState();
            _this.h1writer.start();
            _this.introTimer = setTimeout(function () {
                _this.toggleConversation();
            }, 2500);
        }, 500);
    };
    /**
    * @name introFlow2
    * flow for larger screens
    */
    ConversationalFormDocs.prototype.introFlow2 = function () {
        var _this = this;
        this.h1writer.start();
        this.introTimer = setTimeout(function () {
            document.getElementById("info").classList.add('show');
            _this.introTimer = setTimeout(function () {
                document.getElementById("form").classList.add('show');
                document.getElementById("cf-toggle-btn").classList.add('show');
                _this.introTimer = setTimeout(function () {
                    _this.toggleConversation();
                }, 1500);
            }, 3000);
        }, 1500);
    };
    ConversationalFormDocs.prototype.toggleMenuState = function () {
        var open = this.el.classList.toggle('menu-toggle', !this.el.classList.contains('menu-toggle'));
        if (open) {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormDocs.prototype.toggleConversation = function () {
        var _this = this;
        clearTimeout(this.introTimer);
        if (!this.el.classList.contains('cf-toggle')) {
            if (!this.cf) {
                this.cf = new window.cf.ConversationalForm({
                    formEl: document.getElementById("cf-form"),
                    context: document.getElementById("cf-context"),
                    robotImage: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                    userImage: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
                    submitCallback: function () {
                    },
                    flowStepCallback: function (dto, success, error) {
                        if (dto.input.currentTag.domElement) {
                            if (dto.input.currentTag.domElement.getAttribute("name") == "repeat") {
                                location.reload();
                            }
                            else if (dto.input.currentTag.domElement.getAttribute("name") == "submit-form") {
                                var xhr = new XMLHttpRequest();
                                xhr.addEventListener("load", function () {
                                    _this.cf.addRobotChatResponse("We received your submission 🙌");
                                    success();
                                });
                                xhr.open('POST', document.getElementById("cf-form").getAttribute("action"));
                                xhr.setRequestHeader("accept", "application/javascript");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.send(JSON.stringify(_this.cf.getFormData(true)));
                            }
                            else {
                                success();
                            }
                        }
                        else {
                            success();
                        }
                    }
                });
            }
            if (this.cf.focus)
                this.cf.focus();
            setTimeout(function () {
                _this.el.classList.remove('menu-toggle');
                _this.el.classList.add('cf-toggle');
            }, 10);
        }
        else {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormDocs.start = function () {
        if (!ConversationalFormDocs.instance)
            window.conversationalFormDocs = new ConversationalFormDocs();
    };
    return ConversationalFormDocs;
}());
var H1Writer = (function () {
    function H1Writer(options) {
        this.progress = 0;
        this.progressTarget = 0;
        this.str = "";
        this.strs = ["...", "TBD"];
        this.step = 0;
        this.el = options.el;
        this.strs[1] = this.el.innerHTML;
        this.el.innerHTML = "";
        this.el.classList.add("show");
    }
    H1Writer.prototype.start = function () {
        this.progress = 0;
        this.progressTarget = 1;
        this.str = this.strs[this.step];
        this.render();
    };
    H1Writer.prototype.nextStep = function () {
        if (this.progressTarget == 0) {
            this.step++;
        }
        this.str = this.strs[this.step];
        this.progressTarget = this.progressTarget == 0 ? 1 : 0;
        this.render();
    };
    H1Writer.prototype.render = function () {
        var _this = this;
        this.progress += (this.progressTarget - this.progress) * (this.step == 0 ? 0.15 : 0.09);
        var out = this.str.substr(0, Math.round(this.progress * this.str.length));
        this.el.innerHTML = out;
        if (Math.abs(this.progress - this.progressTarget) <= 0.01) {
            cancelAnimationFrame(this.rAF);
            if (this.step < 1) {
                setTimeout(function () {
                    _this.nextStep();
                }, 500);
            }
        }
        else
            this.rAF = window.requestAnimationFrame(function () { return _this.render(); });
    };
    return H1Writer;
}());
if (document.readyState == "complete") {
    // if document alread instantiated, usually this happens if Conversational Form is injected through JS
    ConversationalFormDocs.start();
}
else {
    // await for when document is ready
    window.addEventListener("load", function () {
        ConversationalFormDocs.start();
    }, false);
}

var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);
// Docs version 1.0.0
// declare module cf{
// 	
// }
// interface cf{
// 	ConversationalForm: any;
// }
// export type ConversationalForm = any;
// interface ConversationalForm = any;
// declare var ConversationalForm: any;
var ConversationalForm = (function () {
    function ConversationalForm() {
    }
    return ConversationalForm;
}());
var ConversationalFormExamples = (function () {
    function ConversationalFormExamples() {
        this.introTimer = 0;
        this.el = document.querySelector("main.content");
        this.h1writer = new H1Writer({
            el: document.getElementById("writer")
        });
        var isMenuVisible = window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display") != "none";
        if (isMenuVisible)
            this.introFlow1();
        else
            this.introFlow2();
    }
    /**
    * @name introFlow1
    * flow for small screens
    */
    ConversationalFormExamples.prototype.introFlow1 = function () {
        var _this = this;
        this.introTimer = setTimeout(function () {
            _this.toggleMenuState();
            _this.h1writer.start();
            _this.introTimer = setTimeout(function () {
                _this.toggleConversation();
            }, 2500);
        }, 500);
    };
    /**
    * @name introFlow2
    * flow for larger screens
    */
    ConversationalFormExamples.prototype.introFlow2 = function () {
        var _this = this;
        this.h1writer.start();
        this.introTimer = setTimeout(function () {
            document.getElementById("info").classList.add('show');
            _this.introTimer = setTimeout(function () {
                document.getElementById("form").classList.add('show');
                document.getElementById("cf-toggle-btn").classList.add('show');
                _this.introTimer = setTimeout(function () {
                    _this.toggleConversation();
                }, 1500);
            }, 3000);
        }, 1500);
    };
    ConversationalFormExamples.prototype.toggleMenuState = function () {
        var open = this.el.classList.toggle('menu-toggle', !this.el.classList.contains('menu-toggle'));
        if (open) {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.prototype.toggleConversation = function () {
        var _this = this;
        clearTimeout(this.introTimer);
        if (!this.el.classList.contains('cf-toggle')) {
            setTimeout(function () {
                _this.el.classList.remove('menu-toggle');
                _this.el.classList.add('cf-toggle');
            }, 10);
        }
        else {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.start = function () {
        if (!ConversationalFormExamples.instance)
            window.conversationalFormExamples = new ConversationalFormExamples();
    };
    return ConversationalFormExamples;
}());
var H1Writer = (function () {
    function H1Writer(options) {
        this.progress = 0;
        this.progressTarget = 0;
        this.str = "";
        this.strs = ["...", "TBD"];
        this.step = 0;
        this.el = options.el;
        this.strs[1] = this.el.innerHTML;
        this.el.innerHTML = "";
        this.el.classList.add("show");
    }
    H1Writer.prototype.start = function () {
        this.progress = 0;
        this.progressTarget = 1;
        this.str = this.strs[this.step];
        this.render();
    };
    H1Writer.prototype.nextStep = function () {
        if (this.progressTarget == 0) {
            this.step++;
        }
        this.str = this.strs[this.step];
        this.progressTarget = this.progressTarget == 0 ? 1 : 0;
        this.render();
    };
    H1Writer.prototype.render = function () {
        var _this = this;
        this.progress += (this.progressTarget - this.progress) * (this.step == 0 ? 0.15 : 0.09);
        var out = this.str.substr(0, Math.round(this.progress * this.str.length));
        this.el.innerHTML = out;
        if (Math.abs(this.progress - this.progressTarget) <= 0.01) {
            cancelAnimationFrame(this.rAF);
            if (this.step < 1) {
                setTimeout(function () {
                    _this.nextStep();
                }, 500);
            }
        }
        else
            this.rAF = window.requestAnimationFrame(function () { return _this.render(); });
    };
    return H1Writer;
}());
if (document.readyState == "complete") {
    // if document alread instantiated, usually this happens if Conversational Form is injected through JS
    ConversationalFormExamples.start();
}
else {
    // await for when document is ready
    window.addEventListener("load", function () {
        ConversationalFormExamples.start();
    }, false);
}

var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormExamples=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10),!1},t.start=function(){t.instance||(window.conversationalFormExamples=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormExamples.start():window.addEventListener("load",function(){ConversationalFormExamples.start()},!1);
// Docs version 1.0.0
// declare module cf{
// 	
// }
// interface cf{
// 	ConversationalForm: any;
// }
// export type ConversationalForm = any;
// interface ConversationalForm = any;
// declare var ConversationalForm: any;
var ConversationalForm = (function () {
    function ConversationalForm() {
    }
    return ConversationalForm;
}());
var ConversationalFormExamples = (function () {
    function ConversationalFormExamples() {
        this.introTimer = 0;
        this.el = document.querySelector("main.content");
        this.h1writer = new H1Writer({
            el: document.getElementById("writer")
        });
        var isMenuVisible = window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display") != "none";
        if (isMenuVisible)
            this.introFlow1();
        else
            this.introFlow2();
    }
    /**
    * @name introFlow1
    * flow for small screens
    */
    ConversationalFormExamples.prototype.introFlow1 = function () {
        var _this = this;
        this.introTimer = setTimeout(function () {
            _this.toggleMenuState();
            _this.h1writer.start();
            _this.introTimer = setTimeout(function () {
                _this.toggleConversation();
            }, 2500);
        }, 500);
    };
    /**
    * @name introFlow2
    * flow for larger screens
    */
    ConversationalFormExamples.prototype.introFlow2 = function () {
        var _this = this;
        this.h1writer.start();
        this.introTimer = setTimeout(function () {
            document.getElementById("info").classList.add('show');
            _this.introTimer = setTimeout(function () {
                document.getElementById("form").classList.add('show');
                document.getElementById("cf-toggle-btn").classList.add('show');
                _this.introTimer = setTimeout(function () {
                    _this.toggleConversation();
                }, 1500);
            }, 1000);
        }, 500);
    };
    ConversationalFormExamples.prototype.toggleMenuState = function () {
        var open = this.el.classList.toggle('menu-toggle', !this.el.classList.contains('menu-toggle'));
        if (open) {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.prototype.toggleConversation = function () {
        var _this = this;
        clearTimeout(this.introTimer);
        if (!this.el.classList.contains('cf-toggle')) {
            setTimeout(function () {
                _this.el.classList.remove('menu-toggle');
                _this.el.classList.add('cf-toggle');
            }, 10);
        }
        else {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.start = function () {
        if (!ConversationalFormExamples.instance)
            window.conversationalFormExamples = new ConversationalFormExamples();
    };
    return ConversationalFormExamples;
}());
var H1Writer = (function () {
    function H1Writer(options) {
        this.progress = 0;
        this.progressTarget = 0;
        this.str = "";
        this.strs = ["...", "TBD"];
        this.step = 0;
        this.el = options.el;
        this.strs[1] = this.el.innerHTML;
        this.el.innerHTML = "";
        this.el.classList.add("show");
    }
    H1Writer.prototype.start = function () {
        this.progress = 0;
        this.progressTarget = 1;
        this.str = this.strs[this.step];
        this.render();
    };
    H1Writer.prototype.nextStep = function () {
        if (this.progressTarget == 0) {
            this.step++;
        }
        this.str = this.strs[this.step];
        this.progressTarget = this.progressTarget == 0 ? 1 : 0;
        this.render();
    };
    H1Writer.prototype.render = function () {
        var _this = this;
        this.progress += (this.progressTarget - this.progress) * (this.step == 0 ? 0.15 : 0.09);
        var out = this.str.substr(0, Math.round(this.progress * this.str.length));
        this.el.innerHTML = out;
        if (Math.abs(this.progress - this.progressTarget) <= 0.01) {
            cancelAnimationFrame(this.rAF);
            if (this.step < 1) {
                setTimeout(function () {
                    _this.nextStep();
                }, 500);
            }
        }
        else
            this.rAF = window.requestAnimationFrame(function () { return _this.render(); });
    };
    return H1Writer;
}());
if (document.readyState == "complete") {
    // if document alread instantiated, usually this happens if Conversational Form is injected through JS
    ConversationalFormExamples.start();
}
else {
    // await for when document is ready
    window.addEventListener("load", function () {
        ConversationalFormExamples.start();
    }, false);
}

var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormExamples=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10),!1},t.start=function(){t.instance||(window.conversationalFormExamples=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormExamples.start():window.addEventListener("load",function(){ConversationalFormExamples.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormDocs=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):(this.cf||(this.cf=new window.cf.ConversationalForm({formEl:document.getElementById("cf-form"),context:document.getElementById("cf-context"),robotImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNzY0LjAwMDAwMCwgLTUzMC4wMDAwMDApIiBmaWxsPSIjMjIyMjIyIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjAwMDAwMCwgNTE5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",userImage:"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMjAgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM3MS4wMDAwMDAsIC02MTAuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNzQuMDAwMDAwLCA1OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9IjEwNyAxMSAxMTcgMjcgOTcgMjciPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",submitCallback:function(){},flowStepCallback:function(e,s,i){if(e.input.currentTag.domElement)if("repeat"==e.input.currentTag.domElement.getAttribute("name"))location.reload();else if("submit-form"==e.input.currentTag.domElement.getAttribute("name")){var n=new XMLHttpRequest;n.addEventListener("load",function(){t.cf.addRobotChatResponse("We received your submission 🙌"),s()}),n.open("POST",document.getElementById("cf-form").getAttribute("action")),n.setRequestHeader("accept","application/javascript"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(t.cf.getFormData(!0)))}else s();else s()}})),this.cf.focus&&this.cf.focus(),setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10)),!1},t.start=function(){t.instance||(window.conversationalFormDocs=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormDocs.start():window.addEventListener("load",function(){ConversationalFormDocs.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormExamples=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},3e3)},1500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10),!1},t.start=function(){t.instance||(window.conversationalFormExamples=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormExamples.start():window.addEventListener("load",function(){ConversationalFormExamples.start()},!1);var ConversationalForm=function(){function t(){}return t}(),ConversationalFormExamples=function(){function t(){this.introTimer=0,this.el=document.querySelector("main.content"),this.h1writer=new H1Writer({el:document.getElementById("writer")});var t="none"!=window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display");t?this.introFlow1():this.introFlow2()}return t.prototype.introFlow1=function(){var t=this;this.introTimer=setTimeout(function(){t.toggleMenuState(),t.h1writer.start(),t.introTimer=setTimeout(function(){t.toggleConversation()},2500)},500)},t.prototype.introFlow2=function(){var t=this;this.h1writer.start(),this.introTimer=setTimeout(function(){document.getElementById("info").classList.add("show"),t.introTimer=setTimeout(function(){document.getElementById("form").classList.add("show"),document.getElementById("cf-toggle-btn").classList.add("show"),t.introTimer=setTimeout(function(){t.toggleConversation()},1500)},1e3)},500)},t.prototype.toggleMenuState=function(){var t=this.el.classList.toggle("menu-toggle",!this.el.classList.contains("menu-toggle"));return t&&this.el.classList.remove("cf-toggle"),!1},t.prototype.toggleConversation=function(){var t=this;return clearTimeout(this.introTimer),this.el.classList.contains("cf-toggle")?this.el.classList.remove("cf-toggle"):setTimeout(function(){t.el.classList.remove("menu-toggle"),t.el.classList.add("cf-toggle")},10),!1},t.start=function(){t.instance||(window.conversationalFormExamples=new t)},t}(),H1Writer=function(){function t(t){this.progress=0,this.progressTarget=0,this.str="",this.strs=["...","TBD"],this.step=0,this.el=t.el,this.strs[1]=this.el.innerHTML,this.el.innerHTML="",this.el.classList.add("show")}return t.prototype.start=function(){this.progress=0,this.progressTarget=1,this.str=this.strs[this.step],this.render()},t.prototype.nextStep=function(){0==this.progressTarget&&this.step++,this.str=this.strs[this.step],this.progressTarget=0==this.progressTarget?1:0,this.render()},t.prototype.render=function(){var t=this;this.progress+=(this.progressTarget-this.progress)*(0==this.step?.15:.09);var e=this.str.substr(0,Math.round(this.progress*this.str.length));this.el.innerHTML=e,Math.abs(this.progress-this.progressTarget)<=.01?(cancelAnimationFrame(this.rAF),this.step<1&&setTimeout(function(){t.nextStep()},500)):this.rAF=window.requestAnimationFrame(function(){return t.render()})},t}();"complete"==document.readyState?ConversationalFormExamples.start():window.addEventListener("load",function(){ConversationalFormExamples.start()},!1);
// Docs version 1.0.0
// declare module cf{
// 	
// }
// interface cf{
// 	ConversationalForm: any;
// }
// export type ConversationalForm = any;
// interface ConversationalForm = any;
// declare var ConversationalForm: any;
var ConversationalForm = (function () {
    function ConversationalForm() {
    }
    return ConversationalForm;
}());
var ConversationalFormExamples = (function () {
    function ConversationalFormExamples() {
        this.introTimer = 0;
        this.el = document.querySelector("main.content");
        var isDevelopment = document.getElementById("conversational-form-development") !== null;
        if (isDevelopment)
            this.el.classList.add("development");
        this.h1writer = new H1Writer({
            el: document.getElementById("writer")
        });
        var isMenuVisible = window.getComputedStyle(document.getElementById("small-screen-menu")).getPropertyValue("display") != "none";
        if (isMenuVisible)
            this.introFlow1();
        else
            this.introFlow2();
    }
    /**
    * @name introFlow1
    * flow for small screens
    */
    ConversationalFormExamples.prototype.introFlow1 = function () {
        var _this = this;
        var isDevelopment = document.getElementById("conversational-form-development") !== null;
        this.introTimer = setTimeout(function () {
            _this.toggleMenuState();
            _this.h1writer.start();
            _this.introTimer = setTimeout(function () {
                _this.toggleConversation();
            }, isDevelopment ? 0 : 2500);
        }, isDevelopment ? 0 : 500);
    };
    /**
    * @name introFlow2
    * flow for larger screens
    */
    ConversationalFormExamples.prototype.introFlow2 = function () {
        var _this = this;
        var isDevelopment = document.getElementById("conversational-form-development") !== null;
        this.h1writer.start();
        this.introTimer = setTimeout(function () {
            document.getElementById("info").classList.add('show');
            _this.introTimer = setTimeout(function () {
                document.getElementById("form").classList.add('show');
                document.getElementById("cf-toggle-btn").classList.add('show');
                _this.introTimer = setTimeout(function () {
                    _this.toggleConversation();
                }, isDevelopment ? 0 : 1500);
            }, isDevelopment ? 0 : 3000);
        }, isDevelopment ? 0 : 1500);
    };
    ConversationalFormExamples.prototype.toggleMenuState = function () {
        var open = this.el.classList.toggle('menu-toggle', !this.el.classList.contains('menu-toggle'));
        if (open) {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.prototype.toggleConversation = function () {
        var _this = this;
        clearTimeout(this.introTimer);
        if (!this.el.classList.contains('cf-toggle')) {
            setTimeout(function () {
                _this.el.classList.remove('menu-toggle');
                _this.el.classList.add('cf-toggle');
            }, 10);
        }
        else {
            this.el.classList.remove('cf-toggle');
        }
        return false;
    };
    ConversationalFormExamples.start = function () {
        if (!ConversationalFormExamples.instance)
            window.conversationalFormExamples = new ConversationalFormExamples();
    };
    return ConversationalFormExamples;
}());
var H1Writer = (function () {
    function H1Writer(options) {
        this.progress = 0;
        this.progressTarget = 0;
        this.str = "";
        this.strs = ["...", "TBD"];
        this.step = 0;
        this.el = options.el;
        this.strs[1] = this.el.innerHTML;
        this.el.innerHTML = "";
        this.el.classList.add("show");
    }
    H1Writer.prototype.start = function () {
        this.progress = 0;
        this.progressTarget = 1;
        this.str = this.strs[this.step];
        this.render();
    };
    H1Writer.prototype.nextStep = function () {
        if (this.progressTarget == 0) {
            this.step++;
        }
        this.str = this.strs[this.step];
        this.progressTarget = this.progressTarget == 0 ? 1 : 0;
        this.render();
    };
    H1Writer.prototype.render = function () {
        var _this = this;
        this.progress += (this.progressTarget - this.progress) * (this.step == 0 ? 0.15 : 0.09);
        var out = this.str.substr(0, Math.round(this.progress * this.str.length));
        this.el.innerHTML = out;
        if (Math.abs(this.progress - this.progressTarget) <= 0.01) {
            cancelAnimationFrame(this.rAF);
            if (this.step < 1) {
                setTimeout(function () {
                    _this.nextStep();
                }, 500);
            }
        }
        else
            this.rAF = window.requestAnimationFrame(function () { return _this.render(); });
    };
    return H1Writer;
}());
if (document.readyState == "complete") {
    // if document alread instantiated, usually this happens if Conversational Form is injected through JS
    ConversationalFormExamples.start();
}
else {
    // await for when document is ready
    window.addEventListener("load", function () {
        ConversationalFormExamples.start();
    }, false);
}
