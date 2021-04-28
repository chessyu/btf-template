import { company } from '@/config.js'

export default {
    data () {
        return {
            isCollapsed: false,
            configData:{}
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
        }
    },
    mounted(){
        this.configData = company;
    },
    methods: {
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        }
    }
}