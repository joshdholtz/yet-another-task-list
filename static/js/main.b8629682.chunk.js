(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(65)},27:function(e,t,a){},29:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},30:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(15),i=a.n(o),s=(a(27),a(16)),l=a(17),c=a(20),u=a(18),d=a(21),v=(a(29),a(30),a(10)),m=a.n(v),h=a(8),f=a.n(h),b=a(19);a(58),a(60),a(62),a(64);var k=function(e){function t(e){var a;Object(s.a)(this,t);var r=(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).load("json"),n=f.a.safeDump(r);return a.state={last_loaded_value:n,value:n,visual_state:"editor"},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"store",value:function(e,t){return window.localStorage.setItem(e,JSON.stringify(t))}},{key:"load",value:function(e){var t=window.localStorage.getItem(e);return JSON.parse(t)}},{key:"isEditor",value:function(){return"editor"===this.state.visual_state}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},this.renderToolbar(),n.a.createElement("div",{id:"workarea"},this.renderEditor(),this.renderVisual()))}},{key:"renderToolbar",value:function(){var e=this,t=this.state.value!==this.state.last_loaded_value;return n.a.createElement("div",{id:"toolbar"},n.a.createElement("div",{id:"toolbar-left"},n.a.createElement("button",{disabled:this.isEditor(),onClick:function(){e.setState({visual_state:"editor"})}},"Editor"),n.a.createElement("button",{disabled:!this.isEditor(),onClick:function(){e.setState({visual_state:"graph"})}},"Visual")),n.a.createElement("div",{id:"toolbar-right"},n.a.createElement("button",{disabled:!t,onClick:function(){e.setState({last_loaded_value:e.state.value});var t=f.a.safeLoad(e.state.value);e.store("json",t)}},"Save")))}},{key:"renderEditor",value:function(){var e=this;if(!this.isEditor())return null;return n.a.createElement(b.Controlled,{value:this.state.value,options:{mode:"yaml",theme:"material",lineNumbers:!0,height:"auto"},onBeforeChange:function(t,a,r){e.setState({value:r})},onChange:function(e,t,a){}})}},{key:"renderVisualRows",value:function(e){var t=this;return m.a.map(e,function(e){var a=e.name,r=e.subtasks||[],o=e.effort||1,i=e.priority||1,s=e.completed||!1,l=null;r.length>0&&(l=t.renderVisualRows(r));var c=.3;switch(i){case 1:c=.4;break;case 2:c=.5;break;case 3:c=.6;break;case 4:c=.8;break;case 5:c=1;break;default:c=.3}var u=5;switch(o){case 1:u=5;break;case 2:u=10;break;case 3:u=20;break;case 4:u=30;break;case 5:u=40;break;default:u=5}var d="";s&&(d="line-through");var v={opacity:c,padding:"".concat(u,"px 10px"),textDecoration:d};return n.a.createElement("div",{className:"visual-row",key:a},n.a.createElement("div",{className:"visual-row-label",style:v},a),n.a.createElement("div",{className:"visual-row-content"},l))})}},{key:"renderVisualProjects",value:function(e){var t=this;return m.a.transform(e,function(e,a,r){var o=t.renderVisualRows(a),i=n.a.createElement("div",{className:"visual-row",key:r},n.a.createElement("div",{className:"visual-row-label"},r),n.a.createElement("div",{className:"visual-row-content"},o));e.push(i)},[])}},{key:"renderVisual",value:function(){if(this.isEditor())return null;var e=f.a.safeLoad(this.state.value).projects,t=this.renderVisualProjects(e);return console.log("projects",e),n.a.createElement("div",{className:"visual"},t)}}]),t}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.b8629682.chunk.js.map