<template>
  <div class="page-container">
    <Breadcrumb :items="['系统管理', '用户管理']" />
    <a-card class="page-content">
      <div class="search-bar">
        <div class="label">部门：</div>
        <a-tree-select
          v-model:value="queryParams.departmentId"
          show-search
          style="width: 300px"
          placeholder="请选择部门"
          allow-clear
          tree-default-expand-all
          :tree-data="departmentData"
          treeNodeFilterProp="name"
          :field-names="{
            children: 'children',
            label: 'name',
            value: 'id',
          }"
          @change="handleSelect"
        ></a-tree-select>
        <a-divider type="vertical" style="height: 24px"></a-divider>
        <div class="label">姓名：</div>
        <a-input-search
          v-model:value="queryParams.name"
          style="width: 300px"
          placeholder="请输入姓名搜索"
          enter-button="查询"
          @search="handleSearch"
        ></a-input-search>
      </div>
      <div class="operation-bar">
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="renderData"
        :loading="loading"
        rowKey="id"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'operation'">
            <a @click="handleEdit(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定要删除吗"
              @confirm="handleDelete(record.id)"
            >
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-pagination
        class="pagination"
        v-if="total"
        v-model:current="queryParams.page"
        :total="total"
        @change="handlePageChange"
      />
    </a-card>
    <DetailModal
      v-model:visible="visible"
      :departmentId="queryParams.departmentId"
      :currentId="currentId"
      :departmentOptions="departmentData"
      :edit="edit"
      @refresh="fetchData"
    >
    </DetailModal>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/components/breadcrumb/index.vue'
import DetailModal from './components/detailModal.vue'
import { reactive, ref, onMounted } from 'vue'
import useLoading from '@/hooks/loading'
import { getUserList, deleteUser, User, QueryParams } from '@/api/user'
import { getDepartmentTree, Department } from '@/api/department'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '岗级',
    dataIndex: 'level',
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
const renderData = ref<User[]>([])
const departmentData = ref<Department[]>([])
const queryParams = reactive<QueryParams>({
  name: '',
  departmentId: -1,
  page: 1,
  size: 10,
})

const total = ref(0)

const fetchDepartment = async () => {
  setLoading(true)
  try {
    const { data } = await getDepartmentTree()
    departmentData.value = data
    queryParams.departmentId = data[0].id as number
  } finally {
    setLoading(false)
  }
}

const fetchData = async () => {
  setLoading(true)
  try {
    const { data } = await getUserList(queryParams)
    renderData.value = data.list
    total.value = data.total
  } finally {
    setLoading(false)
  }
}

onMounted(async () => {
  await fetchDepartment()
  fetchData()
})

const handleSelect = (department: number) => {
  queryParams.name = ''
  queryParams.departmentId = department
  fetchData()
}

const handleSearch = (id: number) => {
  queryParams.page = 1
  fetchData()
}

const handlePageChange = (page: number) => {
  queryParams.page = page
  fetchData()
}

const handleDelete = async (id: number) => {
  try {
    await deleteUser(id)
    message.success('删除成功')
    fetchData()
  } catch (e) {
    console.log(e)
  }
}

const handleAdd = (id: number) => {
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
  name: 'User',
}
</script>

<style scoped lang="less"></style>
