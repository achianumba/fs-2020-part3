(this.webpackJsonpPhonebook=this.webpackJsonpPhonebook||[]).push([[0],{18:function(e,t,n){e.exports=n(41)},23:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(16),c=n(17),r=n(2),o=n(0),u=n.n(o),l=n(15),s=n.n(l),i=(n(23),n(4)),m=n.n(i),d="/api/persons",f=function(){return m.a.get(d)},b=function(e){return m.a.post(d,e)},h=function(e,t){return m.a.put("".concat(d,"/").concat(e),t)},p=function(e){return m.a.delete("".concat(d,"/").concat(e))},v=function(){var e=Object(o.useState)([]),t=Object(r.a)(e,2),n=t[0],l=t[1],s=Object(o.useState)(""),i=Object(r.a)(s,2),m=i[0],d=i[1],v=Object(o.useState)(""),j=Object(r.a)(v,2),O=j[0],N=j[1],w=Object(o.useState)(""),S=Object(r.a)(w,2),k=S[0],C=S[1],x=Object(o.useState)(0),D=Object(r.a)(x,2),P=D[0],U=D[1],A=Object(o.useState)({content:"",type:""}),F=Object(r.a)(A,2),I=F[0],J=F[1],T=function(e,t){J({content:e,type:t}),setTimeout((function(){return J({content:"",type:""})}),5e3)};return Object(o.useEffect)((function(){f("http://localhost:3001/persons").then((function(e){return l(e.data)}))}),[]),u.a.createElement("div",{id:"phonebook"},u.a.createElement("h2",null,"Phonebook"),""!==I.content?u.a.createElement("p",{className:"message message-".concat(I.type)},I.content):"",u.a.createElement("div",{id:"left"},u.a.createElement(E,{handleSearch:function(e){if(e.preventDefault(),0===e.target.value)return U(0);C(e.target.value);var t=n.filter((function(t){return new RegExp("^".concat(e.target.value),"i").test(t.name)}));U(t)},search:k}),u.a.createElement(g,{submit:function(e){e.preventDefault();var t=n.some((function(e){return e.name===m})),r=n.some((function(e){return e.number===O})),o=n.find((function(e){var t=e.name,n=e.number;return t===m&&n!==O}));if(""===m||""===O)return T("Please enter a valid name and phone number","warning");if(void 0===o)return t&&r?T("".concat(m," already exists"),"warning"):(b({name:m,number:O}).then((function(e){l([].concat(Object(a.a)(n),[e.data])),T("Added ".concat(e.data.name," successfully!"),"success")})).catch((function(e){console.log(e.message),T("Unable to save ".concat(m,"."),"error")})),d(""),N(""));var u=o.name;return window.confirm("".concat(u," already exists. Do you want to replace it?"))?h(o.id,Object(c.a)({},o,{number:O})).then((function(e){l(n.filter((function(t){return t.id!==e.data.id})).concat(e.data)),T("Updated ".concat(e.data.name," successfully"),"success"),d(""),N("")})).catch((function(e){console.log(e.message),T("Unable to update ".concat(o.name,". This person's info has been removed from the server."),"error")})):void 0},setName:function(e){return d(e.target.value)},name:m,setNumber:function(e){return N(e.target.value)},number:O})),u.a.createElement(y,{results:P,persons:n,deleteContact:function(e){if(e.preventDefault(),"delete-contact"===e.target.className){var t=e.target.closest("div").firstChild.textContent,a=e.target.closest("div").dataset.id;window.confirm("Delete ".concat(t,"?"))&&p(a).then((function(e){l(n.filter((function(e){return e.id!==Number(a)}))),T("".concat(t," deleted successfully!"),"success")})).catch((function(e){T("Unable to delete ".concat(t,". It has been removed from the server."),"error")}))}}}))},E=function(e){var t=e.handleSearch,n=e.search;return u.a.createElement("div",{id:"search-filter"},u.a.createElement("label",{htmlFor:"search"},"Search:"),u.a.createElement("input",{onChange:t,type:"search",value:n}))},g=function(e){var t=e.submit,n=e.setName,a=e.name,c=e.setNumber,r=e.number;return u.a.createElement("form",{onSubmit:t},u.a.createElement("h3",null,"Add new contact"),u.a.createElement("label",{htmlFor:"name"},"Name:"),u.a.createElement("input",{type:"text",onChange:n,value:a}),u.a.createElement("label",{htmlFor:"number"},"Number:"),u.a.createElement("input",{type:"text",onChange:c,value:r}),u.a.createElement("button",{type:"submit"},"Add"))},y=function(e){var t=e.results,n=e.persons,a=e.deleteContact;return u.a.createElement("div",{id:"contacts",onClick:a},u.a.createElement("h2",null,"Numbers"),0!==t?t.map((function(e){var t=e.name,n=e.number,a=e.id;return u.a.createElement("div",{key:a,className:"contact","data-id":a},u.a.createElement("p",null,t),u.a.createElement("p",null,n," ",u.a.createElement("button",{className:"delete-contact"},"Delete")))})):n.map((function(e){var t=e.name,n=e.number,a=e.id;return u.a.createElement("div",{key:a,className:"contact","data-id":a},u.a.createElement("p",null,t),u.a.createElement("p",null,n," ",u.a.createElement("button",{className:"delete-contact"},"Delete")))})))};s.a.render(u.a.createElement(v,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.eaa535cc.chunk.js.map