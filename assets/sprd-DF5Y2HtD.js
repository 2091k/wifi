import{_ as f,c,a as s,t as g,w as d,d as w,v as p,F as b,r as I,o as m,e as v,p as S,b as k}from"./index-DskAM_JF.js";const y={mixins:[],data(){return{port:{},reader:{},isOpen:!1,dataR:"",dataW:"",timer:null,reader:{},writer:{},list:[1,3,5,8,38,39,40,41],checked:[],imei:"",imei1:"",imei2:"",sn:"",mac:"",bandStr:"",ip:"192.168.0.1"}},computed:{},created(){window.that=this,this.timer=setInterval(()=>{this.isOpen=!!this.port.readable},100)},methods:{async click(){if(!navigator.serial){alert("该浏览器不支持，仅支持基于chromium内核的pc浏览器");return}try{if(this.port.getInfo&&this.port.readable){try{this.reader.releaseLock(),this.writer.releaseLock()}catch{}await this.port.close(),this.reader={}}else{const e=await navigator.serial.requestPort();this.port=e,this.port.readable||(await e.open({dataBits:8,stopBits:1,parity:"none",baudRate:9600}),this.reader=this.port.readable.getReader(),this.writer=this.port.writable.getWriter(),this.readIMEI1(),setTimeout(()=>{this.readIMEI2()},800),setTimeout(()=>{this.getBand()},800))}}catch(e){console.log("error",e),e.message&&!e.message.includes("No port selected by the user")&&alert(e.message)}},getBand(){this.write("AT+SPLBAND=0")},async read(){const e=this.reader,{value:t,done:n}=await e.read();let l=A(t);console.log("接收",l),this.dataR+=l,this.dataHandler(l)},readIMEI1(){this.imei=1,this.write("AT+SPACTCARD=0"),this.write("AT+SPIMEI?")},readIMEI2(){this.imei=2,this.write("AT+SPACTCARD=1"),this.write("AT+SPIMEI?")},async write(e){const t=this.writer;let n=(e||this.dataW)+`\r
`,l=T(n);await t.write(l),setTimeout(()=>{this.read()},300)},dataHandler(e){let t=e.split(`\r
`);t.length>=3&&t.forEach((l,r)=>{console.log(t),l.length===15&&t[r-1]===""&&t[r+1]===""&&(this.imei===1&&(this.imei1=l),this.imei===2&&(this.imei2=l))});let n="+SPLBAND: ";if(e.includes(n)){let l=e.split(","),r=l[1].toString(2),a=l[3].toString(2),i=[];i.push(...this.getSupportedBand(a.toString(2))),parseInt(r).toString(2).split("").reverse().forEach((h,o)=>{h==="1"&&(o===5&&i.push(38),o===6&&i.push(39),o===7&&i.push(40),o===8&&i.push(41))}),this.checked=i}n="*MRD_SN:",e.includes(n)&&(this.sn=e.split(n)[1].split(`\r
`)[0]),n="*MRD_WIFIID: ",e.includes(n)&&(this.mac=e.split(n)[1].split(`\r
`)[0].replaceAll(":",""))},submit(){let e=0,t=0;this.checked.forEach(r=>{r<=20&&(t+=Math.pow(2,r-1)),r>=38&&r<=41&&(e+=Math.pow(2,r-33))});let n=this.bandStr.split(",");n[3]=e,n[4]=t;let l=`AT+SPLBAND=1,0,${e},0,${t},0`;this.write(l)},getSupportedBand(e){return e.split(",").reduce((t,n,l)=>{let r=parseInt(n).toString(2);for(var a=0;a<r.length;a++)parseInt(r[r.length-a-1])&&t.push(l*8+a+1);return t},[])}},async unmounted(){clearInterval(this.timer);try{this.reader.releaseLock(),this.writer.releaseLock(),await this.port.close(),this.reader={}}catch{}},watch:{dataR(){this.$nextTick(()=>{const e=document.getElementById("scroll_text");e.scrollTop=e.scrollHeight})}}};function A(e){for(var t="",n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return t}function T(e){for(var t=[],n=0;n<e.length;n++)t.push(e.charCodeAt(n));var l=new Uint8Array(t);return l}const u=e=>(S("data-v-1f8442c8"),e=e(),k(),e),x={class:"atMaster",style:{padding:"10px"}},E={class:"content"},M={style:{padding:"10px 0"}},C=u(()=>s("label",null,"IMEI1: ",-1)),B={style:{padding:"10px 0"}},R=u(()=>s("label",null,"IMEI2: ",-1)),L={style:{display:"flex","flex-wrap":"wrap","align-items":"center",padding:"10px 0"}},P={for:"option1"},_=["value"],D=u(()=>s("br",null,null,-1)),U=u(()=>s("br",null,null,-1)),N={class:"right"};function V(e,t,n,l,r,a){return m(),c("div",x,[s("button",{onClick:t[0]||(t[0]=(...i)=>a.click&&a.click(...i))},"选择端口 "+g(r.isOpen?"（已开启）":"（未开启）"),1),d(s("div",E,[s("div",M,[C,d(s("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=i=>r.imei1=i)},null,512),[[p,r.imei1]]),s("button",{onClick:t[2]||(t[2]=i=>a.readIMEI1())},"读取"),s("button",{onClick:t[3]||(t[3]=i=>a.write(`AT+SPIMEI =0,"${r.imei1}"`))},"写入")]),s("div",B,[R,d(s("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=i=>r.imei2=i)},null,512),[[p,r.imei2]]),s("button",{onClick:t[5]||(t[5]=i=>a.readIMEI2())},"读取"),s("button",{onClick:t[6]||(t[6]=i=>a.write(`AT+SPIMEI =1,"${r.imei2}"`))},"写入")]),s("div",null,[s("button",{onClick:t[7]||(t[7]=i=>a.write("AT+RESET=1"))},"重启")]),s("div",L,[(m(!0),c(b,null,I(r.list,(i,h)=>(m(),c("span",{key:h,style:{display:"flex","flex-wrap":"wrap","align-items":"center",padding:"0 5px"}},[s("label",P,"LTE B"+g(i),1),d(s("input",{type:"checkbox","onUpdate:modelValue":t[8]||(t[8]=o=>r.checked=o),value:i},null,8,_),[[v,r.checked,void 0,{number:!0}]]),D,U]))),128)),s("button",{onClick:t[9]||(t[9]=(...i)=>a.getBand&&a.getBand(...i))},"读取频段"),s("button",{onClick:t[10]||(t[10]=(...i)=>a.submit&&a.submit(...i))},"锁定频段")]),s("div",null,[d(s("input",{type:"text","onUpdate:modelValue":t[11]||(t[11]=i=>r.dataW=i),placeholder:"发送自定义AT指令"},null,512),[[p,r.dataW]]),s("button",{onClick:t[12]||(t[12]=i=>a.write())},"发送")]),s("div",N,[d(s("textarea",{id:"scroll_text",cols:"30",rows:"10","onUpdate:modelValue":t[13]||(t[13]=i=>r.dataR=i),readonly:""},null,512),[[p,r.dataR]]),s("button",{onClick:t[14]||(t[14]=i=>r.dataR="")},"清理")])],512),[[w,r.isOpen]])])}const H=f(y,[["render",V],["__scopeId","data-v-1f8442c8"]]);export{H as default};
