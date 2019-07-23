<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
    <h5 class="logo"></h5>
    <el-menu
    :router='true'
    :unique-opened='true'
    :default-active='"1-1"'
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
        </template>
        <el-menu-item index="/home/users">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
            </template>
        </el-menu-item>
    </el-submenu>
    </el-menu>
      </el-aside>
      <el-container>
        <el-header>
            <span class="myicon myicon-menu"></span>
            <span style='font-size:20px;color:yellow'>电商后台管理系统</span>
            <a href="Javascript:;" style='color:white'>退出</a>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: yellow;
  }
}
</style>
