
<template>
    <div class="layout">
        <Layout class="layout-box">
            <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="side-logo">
                    {{configData.companyName}}
                </div>
                <Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
                    <MenuItem name="home" :to="{name:'home'}">
                        <Icon type="ios-navigate" ></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <MenuItem name="care" :to="{name:'care'}">
                        <Icon type="ios-search"></Icon>
                        <span>护肤方案</span>
                    </MenuItem>
                    <MenuItem name="private" :to="{name:'private'}">
                        <Icon type="ios-settings"></Icon>
                        <span>私护方案</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px',position: 'absolute','left': 0, 'top': '20px'}" type="md-menu" size="24"></Icon>
                    <Dropdown class="dropdown-box"  trigger="click" @on-click="dropdownChange" >
                        <img class="dropdown" src="@/assets/img/login-h.png" alt="" >
                        <span class="sys-name">系统管理员</span>
                        <DropdownMenu slot="list">
                            <DropdownItem name="loginOut" >退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <keep-alive><router-view></router-view></keep-alive> 
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script src="./layout.js"></script>

<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .side-logo{
        height: 64px;
        line-height: 64px;
        color: #fff;
        font-size: 15px;

    }
    .layout-box{
        width: 100%;
        height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        position: relative;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .dropdown-box{
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
    .dropdown{
        width: 45px;
        vertical-align: middle;
        
    }
    .sys-name{
        font-size: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
</style>