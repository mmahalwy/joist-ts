"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[351],{5318:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,g=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return n?r.createElement(g,a(a({ref:t},u),{},{components:n})):r.createElement(g,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9492:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var r=n(5773),o=n(808),i=(n(7378),n(5318)),a=["components"],l={title:"Adding Joist to Your Project",sidebar_label:"Adding to Your Project",sidebar_position:2},s=void 0,p={unversionedId:"getting-started/adding-to-your-project",id:"getting-started/adding-to-your-project",isDocsHomePage:!1,title:"Adding Joist to Your Project",description:"(TODO: Rewrite/finish this.)",source:"@site/docs/getting-started/adding-to-your-project.md",sourceDirName:"getting-started",slug:"/getting-started/adding-to-your-project",permalink:"/joist-ts/docs/getting-started/adding-to-your-project",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/getting-started/adding-to-your-project.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Adding Joist to Your Project",sidebar_label:"Adding to Your Project",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Sample Project",permalink:"/joist-ts/docs/getting-started/sample-project"},next:{title:"Overview",permalink:"/joist-ts/docs/goals"}},u=[{value:"Setting up Codegen",id:"setting-up-codegen",children:[{value:"If using node-pg-migrate",id:"if-using-node-pg-migrate",children:[],level:3}],level:2}],c={toc:u};function d(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"(TODO: Rewrite/finish this.)"),(0,i.kt)("p",null,"There are three main steps to integrating Joist into your project:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Setup migrations"),(0,i.kt)("li",{parentName:"ol"},"Setup code generation"),(0,i.kt)("li",{parentName:"ol"},"Setup unit tests")),(0,i.kt)("p",null,"It assumes that:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"You have a local postgres database."),(0,i.kt)("p",{parentName:"li"},"I.e. running locally in Docker or just on your machine (see the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/stephenh/joist-ts/blob/master/packages/integration-tests/db.dockerfile"},"db.dockerfile")," that Joist uses for code generation and integration tests).")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"You have a schema management/migration library in place."),(0,i.kt)("p",{parentName:"li"},"If you use ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/salsita/node-pg-migrate"},"node-pg-migrate"),", Joist has several helper methods (i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"createEntityTable"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"createEnumTable"),", etc.), but it's not required to use that specific library."))),(0,i.kt)("h2",{id:"setting-up-codegen"},"Setting up Codegen"),(0,i.kt)("p",null,"Run ",(0,i.kt)("inlineCode",{parentName:"p"},"npm install --save-dev joist-codegen"),"."),(0,i.kt)("p",null,"Define your local postgres creds in a ",(0,i.kt)("inlineCode",{parentName:"p"},"DATABASE_CONNECTION_INFO")," environment variable, i.e. in an ",(0,i.kt)("inlineCode",{parentName:"p"},"local.env")," file similar to:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'DATABASE_CONNECTION_INFO=postgres://joist:local@localhost:5435/joist\n# the AWS RDS/SecretsManager JSON format is also supported natively\nDATABASE_CONNECTION_INFO={"host":"localhost","port":5435,"username":"joist","password":"local","dbname":"joist"}\n')),(0,i.kt)("p",null,"With this env variable set, run the ",(0,i.kt)("inlineCode",{parentName:"p"},"joist-codegen")," module, i.e. with ",(0,i.kt)("inlineCode",{parentName:"p"},"env")," or ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/stephenh/joist-ts/blob/master/packages/integration-tests/run.sh"},(0,i.kt)("inlineCode",{parentName:"a"},"run.sh")),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"./run.sh joist-codegen\n")),(0,i.kt)("h3",{id:"if-using-node-pg-migrate"},"If using node-pg-migrate"),(0,i.kt)("p",null,"If you do use ",(0,i.kt)("inlineCode",{parentName:"p"},"node-pg-migrate"),", the ",(0,i.kt)("inlineCode",{parentName:"p"},"joist-migration-utils")," package has some helper methods + glue code to invoke ",(0,i.kt)("inlineCode",{parentName:"p"},"node-pg-migrate")," with the same ",(0,i.kt)("inlineCode",{parentName:"p"},"DATABASE_CONNECTION_INFO")," environment variable."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"./run.sh joist-migration-utils\n")),(0,i.kt)("p",null,"This will apply any ",(0,i.kt)("inlineCode",{parentName:"p"},"node-pg-migrate")," migrations located in your ",(0,i.kt)("inlineCode",{parentName:"p"},"./migrations/")," directory, and then, if ",(0,i.kt)("inlineCode",{parentName:"p"},"ADD_FLUSH_DATABASE")," is set, add the ",(0,i.kt)("inlineCode",{parentName:"p"},"flush_database()")," function for your tests to use."),(0,i.kt)("p",null,"Note that usually ",(0,i.kt)("inlineCode",{parentName:"p"},"joist-migration-utils")," / your migration library of choice is run first, i.e. a flow would be:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Start your database"),(0,i.kt)("li",{parentName:"ol"},"Reset the schema"),(0,i.kt)("li",{parentName:"ol"},"Apply the migrations from scratch"),(0,i.kt)("li",{parentName:"ol"},"Run code generation")),(0,i.kt)("p",null,"Which, using Joist's integration tests as an example, can look like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"docker-compose up -d db\ndocker-compose exec db ./reset.sh\n./run.sh joist-migration-utils\n./run.sh joist-codegen\n")))}d.isMDXComponent=!0}}]);