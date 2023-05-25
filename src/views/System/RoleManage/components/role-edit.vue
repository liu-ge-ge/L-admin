<template>
  <a-modal title="修改" :visible="props.visible" @ok="ok" @cancel="emits('cancel')">
    <a-form
      :model="formState"
      :rules="rules"
      :label-col="{ md: 5, sm: 5, xs: 24 }"
      :wrapper-col="{ md: 19, sm: 19, xs: 24 }"
    >
      <a-form-item label="角色名称" name="roleName">
        <a-input v-model:value="formState.roleName" :maxlength="20" placeholder="请输入角色名称"></a-input>
      </a-form-item>
      <a-form-item label="角色标识" name="roleCode">
        <a-input v-model:value="formState.roleCode" :maxlength="20" placeholder="请输入角色标识"></a-input>
      </a-form-item>
      <a-form-item label="备注" name="comments">
        <a-textarea :rows="4" v-model:value="formState.comments" :maxlength="200" placeholder="请输入备注"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface EditProps {
  visible: boolean
}
interface EditEmits {
  (e: 'cancel'): void
}
const props = defineProps<EditProps>()
const emits = defineEmits<EditEmits>()

let formState = reactive({
  roleName: '',
  roleCode: '',
  comments: '',
})

let rules = reactive({
  roleName: [
    {
      required: true,
      message: '请输入角色名称',
      type: 'string',
      trigger: 'blur',
    },
  ],
  roleCode: [
    {
      required: true,
      message: '请输入角色标识',
      type: 'string',
      trigger: 'blur',
    },
  ],
})

const ok = () => {}
</script>
