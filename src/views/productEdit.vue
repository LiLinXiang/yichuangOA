<template>
    <div class="mainContent">
        <el-row class="mainContent-topTitle">
            <el-col>产品编辑</el-col>
        </el-row>
        <el-form class="formContent" ref="form" label-width="80px">
            <el-form-item label="所属栏目 :">
                <el-select v-model="value" placeholder="请选择" @change="optionsChange">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="产品图片 :">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :limit="1"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="产品名称 :">
                <el-input placeholder="请输入产品名称"></el-input>
            </el-form-item>


            <div style="margin-bottom:1.5rem ">
                <label class="ueditor-wrap-label">产品说明 :</label>
                <vue-ueditor-wrap class="ueditor-wrap" v-model="msg" :config="uediterConfig" style="margin-left: 80px;"></vue-ueditor-wrap>
            </div>
            <!--<el-form-item label="产品说明 :"></el-form-item>-->


            <el-form-item label="补充说明 :">
                <el-input
                        type="textarea"
                        :autosize="{minRows: 3}"
                        placeholder="请输入内容">
                </el-input>
            </el-form-item>

        </el-form>
        <div class="form-footbar">
            <el-button class="save-botton" type="primary">保存产品信息</el-button>
            <router-link to="ProductManage"><el-button class="save-botton" type="info" plain>返回</el-button></router-link>
        </div>
    </div>
</template>

<script>
    import VueUeditorWrap from 'vue-ueditor-wrap'

    export default {
        name: "productEdit",
        data(){
            return{
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                value: '',
                imageUrl: '',
                dialogImageUrl: '',
                dialogVisible: false,
                msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + UEditor + v-model双向绑定</h2>',
                uediterConfig: {
                    // 如果需要上传功能,找后端小伙伴要服务器接口地址
                    // serverUrl: 'http://api.demo.com/ueditor/upload',
                    // 你的UEditor资源存放的路径,相对于打包后的index.html
                    UEDITOR_HOME_URL: './src/assets/UEditor/',
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 500,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 关闭自动保存
                    enableAutoSave: false
                }
            }
        },
        components: {
            VueUeditorWrap
        },
        methods: {
            optionsChange(value){
                console.log(value);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    if (file.size / 1024 / 1024 < 5) {
                        return true
                    } else {
                        this.$message.error('上传头像图片大小不能超过 5MB!');
                        return false
                    }
                } else {
                    this.$message.error('上传头像图片只能是 JPG获取PNG 格式!');
                    return false
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },

        },

    }
</script>
<style lang="scss">
    .mainContent{
        height: 100%;
        overflow: scroll;
        overflow-x: hidden;
        position: relative;
        padding-bottom: 60px;
    }

    .form-footbar{
        position: fixed;
        bottom: 44px;
        height: 3.5rem;
        background-color: #ecf5ff;
        width: 100%;
        text-align: center;
        border-radius: 5px;
        z-index: 1000;
        .save-botton{
            margin-top: 0.5rem;
            position: relative;
            left: -100px;
        }
    }

    .ueditor-wrap{
        width: 95%;
        display: table-cell;
    }

    .ueditor-wrap-label {
        width: 80px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
    }

</style>

