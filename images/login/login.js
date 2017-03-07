 
var user=$(".font_name>input")[0];
var pwd=$(".font_pwd>input")[0];
//var login=$(".btn>input")[0];
//开始的时候获取本地存储，如果没有，置为[],否则获取
var str = window.localStorage.getItem("userpass")||"[]";
var userpass = JSON.parse(str);
login=function(){
            var username = user.value;
            var password = pwd.value;
            var flag = 0;
            for(var i=0;i<userpass.length;i++){
                if(username==userpass[i].username&&password==userpass[i].password){
//                  alert("欢迎"+username+",登陆成功！");
                    window.location.href="index.html";
                    return false;
                }else{
                    flag++;
                }
            }
            if(flag ==userpass.length){
//              alert("登陆不成功");
                $(".font_pwd>p")[0].innerHTML="用户名或密码不正确!";
                $(".font_pwd>p").css("color","red");
//              window.location.href="login.html";
                return false;
            }
        }