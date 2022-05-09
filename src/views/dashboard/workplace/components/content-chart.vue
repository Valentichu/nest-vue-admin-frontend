<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      title="查看"
    >
      <template #extra>
        <a-link>查看</a-link>
      </template>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import useLoading from "@/hooks/loading";
import { queryContentData, ContentDataRecord } from "@/api/dashboard";
import { AnyObject } from "@/types/global";

function graphicFactory(side: AnyObject) {
  return {
    type: "text",
    bottom: "8",
    ...side,
    style: {
      text: "",
      textAlign: "center",
      fill: "#4E5969",
      fontSize: 12,
    },
  };
}
const { loading, setLoading } = useLoading(true);
const xAxis = ref<string[]>([]);
const chartsData = ref<number[]>([]);
const graphicElements = ref([
  graphicFactory({ left: "2.6%" }),
  graphicFactory({ right: 0 }),
]);
const fetchData = async () => {
  setLoading(true);
  try {
    const { data: chartData } = await queryContentData();
    chartData.forEach((el: ContentDataRecord, idx: number) => {
      xAxis.value.push(el.x);
      chartsData.value.push(el.y);
      if (idx === 0) {
        graphicElements.value[0].style.text = el.x;
      }
      if (idx === chartData.length - 1) {
        graphicElements.value[1].style.text = el.x;
      }
    });
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData();
</script>

<style scoped lang="less"></style>
