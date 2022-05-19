<template>
  <div class="page-container">
    <Breadcrumb :items="['系统管理', '部门管理']" />
    <a-card class="page-content">
      <a-table
        :columns="columns"
        :data-source="renderData"
        :pagination="false"
        :loading="loading"
        rowKey="id"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'operation'">
            <a @click="handleAdd(record.id)">新增</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record.id)">编辑</a>
            <template v-if="!isTopLevel(record.id)">
              <a-divider type="vertical" />
              <a-popconfirm
                title="确定要删除吗"
                @confirm="handleDelete(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </template>
          </span>
        </template>
      </a-table>
    </a-card>
    <DetailModal
      v-model:visible="visible"
      :currentId="currentId"
      :edit="edit"
      @refresh="fetchData"
    >
    </DetailModal>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/components/breadcrumb/index.vue'
import DetailModal from './components/detailModal.vue'
import { ref } from 'vue'
import useLoading from '@/hooks/loading'
import {
  getDepartmentTree,
  deleteDepartment,
  Department,
} from '@/api/department'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '部门名',
    dataIndex: 'name',
  },
  {
    title: '操作',
    key: 'operation',
    width: 300,
  },
]

const { loading, setLoading } = useLoading(false)
const visible = ref(false)
const edit = ref(false)
const currentId = ref(-1)
const renderData = ref<Department[]>([])

const fetchData = async () => {
  setLoading(true)
  try {
    const { data } = await getDepartmentTree()
    renderData.value = data
  } finally {
    setLoading(false)
  }
}

fetchData()

const isTopLevel = (id: number) => {
  return !!renderData.value.find((item) => item.id === id)
}

const handleDelete = async (id: number) => {
  try {
    await deleteDepartment(id)
    message.success('删除成功')
    fetchData()
  } catch (e) {
    console.log(e)
  }
}

const handleAdd = (id: number) => {
  currentId.value = id
  edit.value = false
  visible.value = true
}

const handleEdit = (id: number) => {
  currentId.value = id
  edit.value = true
  visible.value = true
}
</script>

<script lang="ts">
export default {
  name: 'Department',
}
</script>

<style scoped lang="less"></style>
