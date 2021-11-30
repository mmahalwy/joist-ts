"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[405],{5318:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(7378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,h=d["".concat(s,".").concat(m)]||d[m]||u[m]||r;return n?o.createElement(h,i(i({ref:t},p),{},{components:n})):o.createElement(h,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5543:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var o=n(5773),a=n(808),r=(n(7378),n(5318)),i=["components"],l={title:"Code Generation",sidebar_position:2},s=void 0,c={unversionedId:"goals/code-generation",id:"goals/code-generation",isDocsHomePage:!1,title:"Code Generation",description:"One of the primary ways Joist achieves ActiveRecord-level productivity and DRY-ness is by leveraging schema-driven code generation.",source:"@site/docs/goals/code-generation.md",sourceDirName:"goals",slug:"/goals/code-generation",permalink:"/joist-ts/docs/goals/code-generation",editUrl:"https://github.com/stephen/joist-ts/edit/main/docs/docs/goals/code-generation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Code Generation",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/joist-ts/docs/goals"},next:{title:"N+1 Safety",permalink:"/joist-ts/docs/goals/dataloader-integration"}},p=[{value:"Evergreen Code Generation",id:"evergreen-code-generation",children:[],level:3},{value:"Custom Business Logic",id:"custom-business-logic",children:[],level:3},{value:"Declarative Customizations (TODO)",id:"declarative-customizations-todo",children:[],level:3},{value:"Pros/Cons",id:"proscons",children:[],level:3}],u={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"One of the primary ways Joist achieves ActiveRecord-level productivity and DRY-ness is by leveraging ",(0,r.kt)("strong",{parentName:"p"},"schema-driven code generation"),"."),(0,r.kt)("p",null,"I.e. for an ",(0,r.kt)("inlineCode",{parentName:"p"},"authors")," table, the initial ",(0,r.kt)("inlineCode",{parentName:"p"},"Author.ts")," file is as clean & simple as:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},'import { AuthorCodegen } from "./entities";\n\nexport class Author extends AuthorCodegen {}\n')),(0,r.kt)("p",null,"Similar to ActiveRecord, Joist automatically adds all the columns to the ",(0,r.kt)("inlineCode",{parentName:"p"},"Author")," class for free, without you having to re-type them in your domain object."),(0,r.kt)("p",null,"It does this for:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Primitive columns, i.e. ",(0,r.kt)("inlineCode",{parentName:"li"},"first_name")," can be set via ",(0,r.kt)("inlineCode",{parentName:"li"},'author.firstName = "bob"')),(0,r.kt)("li",{parentName:"ul"},"Foreign key columns, i.e. ",(0,r.kt)("inlineCode",{parentName:"li"},"book.author_id")," can be set via ",(0,r.kt)("inlineCode",{parentName:"li"},"book.author.set(...)"),", and"),(0,r.kt)("li",{parentName:"ul"},"Foreign key collections, i.e. ",(0,r.kt)("inlineCode",{parentName:"li"},"Author.books")," can be loaded via ",(0,r.kt)("inlineCode",{parentName:"li"},"await author.books.load()"),".")),(0,r.kt)("p",null,"Joist does this via build-time code generation (i.e. by running a ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run joist-codegen")," command)."),(0,r.kt)("p",null,"This approach allows the generated types to be seen by the TypeScript compiler and IDEs, and so provides a type-safe view of your database."),(0,r.kt)("h3",{id:"evergreen-code-generation"},"Evergreen Code Generation"),(0,r.kt)("p",null,"Joist's code generation runs continually (although currently invoked by hand, i.e. individual ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run joist-codegen")," commands), after every migration/schema change, so your domain objects will always 1-to-1 match your schema, without having to worry about them mismatching or tediously keeping the two in sync."),(0,r.kt)("h3",{id:"custom-business-logic"},"Custom Business Logic"),(0,r.kt)("p",null,"Even though Joist's code generation runs continually, it only touches the ",(0,r.kt)("inlineCode",{parentName:"p"},"Author.ts")," once."),(0,r.kt)("p",null,"After that, all of Joist's updates are made only to a separate ",(0,r.kt)("inlineCode",{parentName:"p"},"AuthorCodegen.ts")," file."),(0,r.kt)("p",null,"This makes ",(0,r.kt)("inlineCode",{parentName:"p"},"Author.ts"),' a safe space to add any custom business logic you might need, separate from the boilerplate of the various getters, setters, and relations that are isolated into "codegen" base class, and always overwritten.'),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"../features/lifecycle-hooks"},"Lifecycle Hooks")," and ",(0,r.kt)("a",{parentName:"p",href:"../features/derived-fields"},"Derived Fields")," for examples of how to add business logic."),(0,r.kt)("h3",{id:"declarative-customizations-todo"},"Declarative Customizations (TODO)"),(0,r.kt)("p",null,"If you do need to customize how a column is mapped, Joist ",(0,r.kt)("em",{parentName:"p"},"should")," (these are not implemented yet) have two levers to pull:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Declare a rule based on the column's name and/or type"),(0,r.kt)("p",{parentName:"li"},"In the ",(0,r.kt)("inlineCode",{parentName:"p"},"joist-codegen.json")," config file, define all ",(0,r.kt)("inlineCode",{parentName:"p"},"timestampz")," columns should be mapped as type ",(0,r.kt)("inlineCode",{parentName:"p"},"MyCustomDateTime"),"."),(0,r.kt)("p",{parentName:"li"},"This is preferable to per-column configuration/annotations because you can declare the rule once, and have it apply to all applicable columns in your schema.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Declare a specific user type for a column."),(0,r.kt)("p",{parentName:"li"},"In the ",(0,r.kt)("inlineCode",{parentName:"p"},"joist-codegen.json")," config file, define the column's specific user type."))),(0,r.kt)("h3",{id:"proscons"},"Pros/Cons"),(0,r.kt)("p",null,"This approach (continual, verbatim mapping of the database schema to your object model) generally assumes you have a modern/pleasant schema to work with, and you don't need your object model to look dramatically different from your database tables."),(0,r.kt)("p",null,"And specifically that this 1-1 restriction is a feature, because it should largely help avoid the ",(0,r.kt)("a",{parentName:"p",href:"https://blog.codinghorror.com/object-relational-mapping-is-the-vietnam-of-computer-science/"},"horror stories of ORMs"),", where the ORM is asked to do non-trivial translation between a database schema and object model that are fundamentally at odds."))}d.isMDXComponent=!0}}]);