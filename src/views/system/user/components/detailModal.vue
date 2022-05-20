<template>
  <a-modal
    title="详情"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form :model="formData" @finish="handleSubmit">
      <a-form-item
        label="部门名"
        name="name"
        :rules="[{ required: true, message: '请输入部门名' }]"
      >
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit" :loading="loading">
          确定
        </a-button>
      </a-space>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useLoading from '@/hooks/loading'
import { User, addUser, getUser, updateUser } from '@/api/user'
import { message } from 'ant-design-vue'

const { loading, setLoading } = useLoading(false)

const emit = defineEmits(['update:visible', 'refresh'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  currentId: {
    type: Number,
    default: null,
  },
  edit: {
    type: Boolean,
    default: false,
  },
})

const initialData = {
  name: '',
  parentId: null,
}

const formData = ref<User>({
  name: '',
  parentId: null,
})

watch(
  () => props.visible,
  async () => {
    if (props.visible) {
      if (props.edit) {
        const { data } = await getUser(props.currentId)
        formData.value = {
          ...initialData,
          ...data,
        }
      } else {
        formData.value = {
          ...initialData,
          parentId: props.currentId,
        }
      }
    }
  }
)

const handleSubmit = async () => {
  setLoading(true)
  try {
    if (!props.edit) {
      await addUser(formData.value)
      message.success('新增成功')
    } else {
      await updateUser(props.currentId, formData.value)
      message.success('修改成功')
    }
    emit('update:visible', false)
    emit('refresh')
  } finally {
    setLoading(false)
  }
}
const handleCancel = () => {
  emit('update:visible', false)
}
</script>

<style scoped></style>
