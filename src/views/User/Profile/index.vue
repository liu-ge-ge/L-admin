<template>
  <a-row :gutter="16">
    <a-col :span="6" :xxl="6" :xl="7" :lg="9" :md="10" :sm="24" :xs="24">
      <a-card :bordered="false" style="height: 100%" class="card-l">
        <div class="info_top">
          <a-avatar :size="94">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <p class="name">管理员</p>
          <p class="introduce">前路迷茫,拨雾前行</p>
        </div>
        <div class="list">
          <div class="item">
            <user-outlined />
            <span>资深前端工程师</span>
          </div>
          <div class="item">
            <home-outlined />
            <span>L网络 - 研发部 - 前端组</span>
          </div>
          <div class="item">
            <environment-outlined />
            <span>中国 · 河南省 · 南阳市</span>
          </div>
          <div class="item">
            <phone-outlined />
            <span>1566002xxxx</span>
          </div>
          <div class="item">
            <tag-outlined />
            <span>Javascript、Nodejs、Mysql</span>
          </div>
        </div>
        <div class="tagsD">
          <p>标签</p>
          <div>
            <a-tag color="default">帅锅</a-tag>
            <a-tag color="default">宅男</a-tag>
            <a-tag color="default">计算机</a-tag>
          </div>
        </div>
      </a-card>
    </a-col>
    <a-col :span="18" :bordered="false" :xxl="18" :xl="17" :lg="15" :md="14" :sm="24" :xs="24">
      <a-card :bordered="false" style="height: 100%" class="card-l">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="基本信息">
            <a-form
              :rules="rules"
              name="info"
              :model="form"
              :label-col="{ lg: 3, md: 6, sm: 4, xs: 24 }"
              :wrapper-col="{ lg: 20, md: 18, sm: 20, xs: 24 }"
            >
              <a-form-item label="昵称" name="name">
                <a-input v-model:value="form.name" placeholder="请输入昵称"></a-input>
              </a-form-item>
              <a-form-item label="性别" name="sex">
                <a-select v-model:value="form.sex">
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                  <a-select-option value="保密">保密</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="邮箱" name="email">
                <a-input v-model:value="form.email" placeholder="请输入邮箱"></a-input>
              </a-form-item>
              <a-form-item label="个人简介" name="introduction">
                <a-textarea v-model:value="form.introduction" :rows="4" placeholder="请输入简介" />
              </a-form-item>
              <a-form-item label="联系方式" name="phone">
                <a-input v-model:value="form.phone" placeholder="请输入联系方式"></a-input>
              </a-form-item>
              <a-form-item :wrapper-col="{ lg: { offset: 3 }, md: { offset: 6 }, sm: { offset: 4 } }">
                <a-button type="primary" :loading="loading" @click="save">
                  {{ loading ? '保存中..' : '保存更改' }}
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="账号绑定">
            <div class="list-acc">
              <div class="left">
                <div class="d1">密保手机</div>
                <div class="d2">已绑定手机:156****0230</div>
              </div>
              <a>去修改</a>
            </div>
            <div class="list-acc">
              <div class="left">
                <div class="d1">密保邮箱</div>
                <div class="d2">已绑定邮箱:2212722889@qq.com</div>
              </div>
              <a>去修改</a>
            </div>
            <div class="list-acc">
              <div class="left">
                <div class="d1">密保问题</div>
                <div class="d2">未设置密保问题</div>
              </div>
              <a>去设置</a>
            </div>
            <div class="list-acc">
              <qq-outlined class="user-account-icon" />
              <div class="left">
                <div class="d1">绑定QQ</div>
                <div class="d2">当前未绑定QQ</div>
              </div>
              <a>去绑定</a>
            </div>
            <div class="list-acc">
              <wechat-outlined class="user-account-icon" />
              <div class="left">
                <div class="d1">绑定微信</div>
                <div class="d2">当前未绑定绑定微信账号</div>
              </div>
              <a>去绑定</a>
            </div>
            <div class="list-acc">
              <wechat-outlined class="user-account-icon" />
              <div class="left">
                <div class="d1">绑定支付宝</div>
                <div class="d2">当前未绑定绑定支付宝账号</div>
              </div>
              <a>去绑定</a>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/lib/form'
import { reactive } from 'vue'
import { ref } from 'vue'

let activeKey = ref('1')
let form = reactive({
  name: '刘哥哥~',
  sex: '保密',
  email: '221272289@qq.com',
  introduction: '前路迷茫,拨雾前行',
  phone: '15660020230',
})

// 表单验证
const rules = reactive<Record<string, Rule[]>>({
  name: [
    {
      required: true,
      message: '请输入昵称',
      type: 'string',
    },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      type: 'string',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      type: 'string',
    },
  ],
})

let loading = ref(false)
const save = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('保存成功!')
  }, 2000)
}
</script>
<style lang="less">
.card-l {
  background-color: @system-content;
  color: @system-text-color;
  .list-acc {
    width: 100%;
    padding: 10px 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .user-account-icon {
      font-size: 30px;
      margin: 0 10px;
      padding: 10px;
      color: white;
      border-radius: 50%;
      &.anticon-qq {
        background: #3492ed;
      }

      &.anticon-wechat {
        background: #4daf29;
      }

      &.anticon-alipay {
        background: #1476fe;
      }
    }
    .left {
      flex: 1;
      .d1 {
      }
      .d2 {
        margin-top: 10px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}

.info_top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .name {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 5px;
  }
}
.list {
  margin-top: 30px;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span {
      margin-left: 10px;
    }
  }
}
.tagsD {
  margin-top: 20px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: start;
  p {
    margin-top: 10px;
  }
}
</style>
