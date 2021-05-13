import { company } from '@/config.js'

export default {
    data () {
        return {
            isCollapsed: false,
            configData:{},
            activeName:'home'
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
    },
    mounted(){
        this.configData = company;
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        },
        dropdownChange(name){
            if(name == 'loginOut'){
                this.$router.push({name:'login'})
            }
        },
        selectMenu(path){
            this.activeName = path;
        }
    }
}