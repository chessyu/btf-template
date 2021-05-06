

export default{
    data(){
        return{
            formInline :{
                user: 'admin',
                password: '123456',
            },
            ruleInline : {
                user: [
                    { required: true, message: '账号为必填项', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码为必填项', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码过于敷衍', trigger: 'blur' }
                ],
                // verCode:[
                //     { required: true, message: '验证码为必填项', trigger: 'blur' }
                // ]
            },
            remember : true,
            verCode:'',
            
            logType:'default'
        }
    },
    mounted(){
        let _this = this;
        document.onkeydown = function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode == 13){
                _this.singIn();
            }
        };
        
    },
    methods:{

       
        singIn () {
            this.$refs['formInline'].validate( (valid) => {
                if (valid) {
                   if(this.formInline.user !== 'admin' || this.formInline.password !== '123456'){
                    this.$Message.error("账号密码不正确");
                   }else{
                    this.$router.push({name:'layout'})
                   }
                
                }
            });
        },
        //取需要缓存的字段
        getCacheDataList(){
           
        },
       
        focusUserName(){
            this.logType = "focusUserName"
        },
        focusPassWord(){
            this.logType = "focusPassword"
        }, 
        blur(){
            this.logType = 'default';
        }
    },
    
}