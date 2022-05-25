<template>
  <a-modal
    title="详情"
    :visible="visible"
    @cancel="handleCancel"
    :footer="null"
  >
    <a-form
      :model="formData"
      @finish="handleSubmit"
      autocomplete="off"
      :label-col="{ flex: '100px' }"
      :wrapper-col="{ flex: 'auto' }"
      :labelWrap="true"
    >
      <a-form-item
        label="姓名"
        name="name"
        :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item
        label="账号"
        name="username"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input v-model:value="formData.username" />
      </a-form-item>
      <a-form-item
        label="部门"
        name="departmentId"
        :rules="[{ required: true, message: '请选择部门' }]"
      >
        <a-tree-select
          v-model:value="formData.departmentId"
          show-search
          placeholder="请选择部门"
          allow-clear
          tree-default-expand-all
          :tree-data="departmentOptions"
          treeNodeFilterProp="name"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'id',
          }"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="角色"
        name="roleName"
        :rules="[{ required: true, message: '请选择角色' }]"
      >
        <a-select v-model:value="formData.roleName" placeholder="请选择角色">
          <a-select-option
            v-for="role in roleOptions"
            :key="role.value"
            :value="role.value"
            >{{ role.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        label="绩效考核"
        name="kpi"
        :rules="[{ required: true, message: '请选择' }]"
      >
        <a-switch
          v-model:checked="formData.kpi"
          checked-children="是"
          un-checked-children="否"
        />
      </a-form-item>
      <a-form-item
        label="电话"
        name="phone"
        :rules="[
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的电话号码',
          },
        ]"
      >
        <a-input v-model:value="formData.phone" />
      </a-form-item>
      <a-form-item label="岗级" name="level">
        <a-input v-model:value="formData.level" />
      </a-form-item>
      <a-form-item label="年龄" name="age">
        <a-input-number v-model:value="formData.age" :min="20" :max="65" />
      </a-form-item>
      <a-form-item label="学历" name="education">
        <a-input v-model:value="formData.education" />
      </a-form-item>
      <a-form-item label="职称" name="professionalTitle">
        <a-input v-model:value="formData.professionalTitle" />
      </a-form-item>
      <a-form-item label="入职时间" name="employmentDate">
        <a-date-picker
          v-model:value="formData.employmentDate"
          valueFormat="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item label="职称聘任时间" name="appointmentDate">
        <a-date-picker
          v-model:value="formData.appointmentDate"
          valueFormat="YYYY-MM-DD"
        />
      </a-form-item>
      <a-form-item label="预计晋升时间" name="promotionDate">
        <a-date-picker
          v-model:value="formData.promotionDate"
          picker="year"
          valueFormat="YYYY"
        />
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
import { PropType, ref, watch } from 'vue'
import useLoading from '@/hooks/loading'
import { User, addUser, getUser, updateUser } from '@/api/user'
import { message } from 'ant-design-vue'
import { Department } from '@/api/department'

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
  departmentId: {
    type: Number,
    default: null,
  },
  departmentOptions: {
    type: Array as PropType<Department[]>,
    default() {
      return []
    },
  },
  edit: {
    type: Boolean,
    default: false,
  },
})

const roleOptions = [
  {
    label: '管理员',
    value: 'admin',
  },
  {
    label: '用户',
    value: 'user',
  },
]

const initialData: User = {
  name: '',
  username: '',
  phone: '',
  level: '',
  age: null,
  employmentDate: null,
  appointmentDate: null,
  promotionDate: null,
  education: '',
  professionalTitle: '',
  roleName: null,
  departmentId: null,
  kpi: true,
}

const formData = ref<User>({
  ...initialData,
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
          departmentId: props.departmentId,
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
