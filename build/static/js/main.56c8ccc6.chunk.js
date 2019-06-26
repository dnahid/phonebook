(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,n,t){e.exports=t(40)},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),u=t(14),o=t.n(u),c=t(15),l=t(4),i=t(2),m=function(e){var n=e.person,t=e.deletePerson;return a.a.createElement("li",null,n.name," ",n.number," ",a.a.createElement("button",{onClick:function(){return t(n.id)}},"Delete"))},s=function(e){var n=e.persons,t=e.deletePerson;return a.a.createElement("ul",null,n.map(function(e,n){return a.a.createElement(m,{person:e,deletePerson:t,key:n})}))},d=function(e){var n=e.valueChangeHandler,t=e.value;return a.a.createElement("div",null,"filter shown with: ",a.a.createElement("input",{onChange:n,value:t}))},f=function(e){return a.a.createElement("form",null,a.a.createElement("div",null,"name: ",a.a.createElement("input",{onChange:e.nameField.handlePersonNameInput,value:e.nameField.newName}),"number: ",a.a.createElement("input",{onChange:e.numberField.handlePhoneNumberInput,value:e.numberField.newNumber})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit",onClick:e.savePerson},"add")))},b=t(3),h=t.n(b),v="/api/persons",p=function(){return h.a.get(v).then(function(e){return e.data})},w=function(e){return h.a.post(v,e).then(function(e){return e.data})},E=function(e){return h.a.put("".concat(v,"/").concat(e.id),e).then(function(e){return e.data})},j=function(e){return h.a.delete("".concat(v,"/").concat(e)).then(function(e){return e.data})},O=(t(39),function(e){var n=e.message,t=e.type;return null===n?null:"error"===t?a.a.createElement("div",{className:"error"},n):"success"===t?a.a.createElement("div",{className:"success"},n):void 0}),g=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],u=n[1],o=Object(r.useState)(""),m=Object(i.a)(o,2),b=m[0],h=m[1],v=Object(r.useState)(""),g=Object(i.a)(v,2),C=g[0],N=g[1],P=Object(r.useState)(""),y=Object(i.a)(P,2),k=y[0],F=y[1],L=Object(r.useState)(null),S=Object(i.a)(L,2),I=S[0],D=S[1],H=Object(r.useState)("error"),J=Object(i.a)(H,2),T=J[0],x=J[1];Object(r.useEffect)(function(){p().then(function(e){return u(e)})},[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(O,{message:I,type:T}),a.a.createElement("h2",null,"Add a new"),a.a.createElement(d,{valueChangeHandler:function(e){F(e.target.value.trim())},value:k}),a.a.createElement(f,{nameField:{newName:b,handlePersonNameInput:function(e){h(e.target.value)}},numberField:{newNumber:C,handlePhoneNumberInput:function(e){N(e.target.value)}},savePerson:function(e){e.preventDefault();var n=t.find(function(e){return e.name.toLowerCase()===b.trim().toLowerCase()});n?window.confirm("".concat(n.name," is already added to phonebook. Do you want to replace the number with a new one?"))&&E(Object(l.a)({},n,{number:C.trim()})).then(function(e){return u(t.map(function(e){return e.name.toLowerCase()===n.name.toLowerCase()?Object(l.a)({},e,{number:C.trim()}):e}))}):w({name:b.trim(),number:C.trim()}).then(function(e){u([].concat(Object(c.a)(t),[e])),D("".concat(e.name," is added to the server")),setTimeout(function(){return D(null)},2e3),x("success")}).catch(function(e){return alert("Error ".concat(e," occured."))}),h(""),N("")}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(s,{persons:k.length?t.filter(function(e){return e.name.toLowerCase().includes(k.toLowerCase())}):t,deletePerson:function(e){window.confirm("Do you want to delete ".concat(t.find(function(n){return n.id===e}).name,"?"))&&j(e).then(function(n){return u(t.filter(function(n){return n.id!==e}))}).catch(function(n){u(t.filter(function(n){return n.id!==e})),D("".concat(e," is already removed from the server.")),setTimeout(function(){return D(null)},2e3),x("error")})}}))};o.a.render(a.a.createElement(g,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.56c8ccc6.chunk.js.map