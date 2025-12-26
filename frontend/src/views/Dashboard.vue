<template>
  <div class="page-container">
    <div class="dashboard-grid">
      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon" style="background-color: var(--p-primary-100); color: var(--p-primary-600);">
              <i class="pi pi-database"></i>
            </div>
            <div class="stat-info">
              <div class="stat-label">数据总量</div>
              <div class="stat-value">12,458</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon" style="background-color: var(--p-orange-100); color: var(--p-orange-600);">
              <i class="pi pi-chart-bar"></i>
            </div>
            <div class="stat-info">
              <div class="stat-label">处理任务</div>
              <div class="stat-value">3,847</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon" style="background-color: var(--p-cyan-100); color: var(--p-cyan-600);">
              <i class="pi pi-check-circle"></i>
            </div>
            <div class="stat-info">
              <div class="stat-label">完成率</div>
              <div class="stat-value">94.2%</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="stat-content">
            <div class="stat-icon" style="background-color: var(--p-primary-100); color: var(--p-primary-600);">
              <i class="pi pi-clock"></i>
            </div>
            <div class="stat-info">
              <div class="stat-label">平均耗时</div>
              <div class="stat-value">2.3s</div>
            </div>
          </div>
        </template>
      </Card>

      <Card class="chart-card chart-large">
        <template #title>
          <div class="chart-title">
            <i class="pi pi-chart-line"></i>
            <span>趋势分析</span>
          </div>
        </template>
        <template #content>
          <Chart type="line" :data="lineChartData" :options="chartOptions" class="chart-container" />
        </template>
      </Card>

      <Card class="chart-card chart-large">
        <template #title>
          <div class="chart-title">
            <i class="pi pi-chart-bar"></i>
            <span>数据分布</span>
          </div>
        </template>
        <template #content>
          <Chart type="bar" :data="barChartData" :options="chartOptions" class="chart-container" />
        </template>
      </Card>

      <Card class="chart-card chart-medium">
        <template #title>
          <div class="chart-title">
            <i class="pi pi-chart-pie"></i>
            <span>占比分析</span>
          </div>
        </template>
        <template #content>
          <Chart type="doughnut" :data="doughnutChartData" :options="doughnutOptions" class="chart-container" />
        </template>
      </Card>

      <Card class="chart-card chart-medium">
        <template #title>
          <div class="chart-title">
            <i class="pi pi-bolt"></i>
            <span>性能监控</span>
          </div>
        </template>
        <template #content>
          <Chart type="polarArea" :data="polarChartData" :options="polarOptions" class="chart-container" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'primevue/chart';
import Card from 'primevue/card';

interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
    hoverBackgroundColor?: string[];
  }[];
}

interface ChartOptions {
  maintainAspectRatio: boolean;
  responsive: boolean;
  plugins: {
    legend: {
      labels: {
        color: string;
        font?: {
          size?: number;
        };
      };
    };
  };
  scales?: {
    x: {
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
    y: {
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
  };
}

const lineChartData = ref<ChartData>();
const barChartData = ref<ChartData>();
const doughnutChartData = ref<ChartData>();
const polarChartData = ref<ChartData>();
const chartOptions = ref<ChartOptions>();
const doughnutOptions = ref<ChartOptions>();
const polarOptions = ref<ChartOptions>();

const getDocumentStyle = (): CSSStyleDeclaration => {
  return getComputedStyle(document.documentElement);
};

const setLineChartData = (): ChartData => {
  const documentStyle = getDocumentStyle();

  return {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    datasets: [
      {
        label: '密钥生成',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: documentStyle.getPropertyValue('--p-primary-500'),
        backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        label: '数据解密',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ]
  };
};

const setBarChartData = (): ChartData => {
  const documentStyle = getDocumentStyle();

  return {
    labels: ['小红书', '微信', 'MosGram', '悟空IM', '抖音', '其他'],
    datasets: [
      {
        label: '成功',
        backgroundColor: documentStyle.getPropertyValue('--p-emerald-500'),
        data: [540, 325, 702, 490, 320, 150]
      },
      {
        label: '失败',
        backgroundColor: documentStyle.getPropertyValue('--p-red-500'),
        data: [45, 32, 28, 15, 25, 12]
      }
    ]
  };
};

const setDoughnutChartData = (): ChartData => {
  const documentStyle = getDocumentStyle();

  return {
    labels: ['小红书', '微信', 'MosGram', '悟空IM', '抖音'],
    datasets: [
      {
        data: [540, 325, 702, 490, 320],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-red-500'),
          documentStyle.getPropertyValue('--p-emerald-500'),
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-primary-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-red-400'),
          documentStyle.getPropertyValue('--p-emerald-400'),
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-primary-400')
        ]
      }
    ]
  };
};

const setPolarChartData = (): ChartData => {
  const documentStyle = getDocumentStyle();

  return {
    labels: ['CPU', '内存', '磁盘', '网络', 'IO'],
    datasets: [
      {
        data: [11, 16, 7, 14, 28],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-red-500'),
          documentStyle.getPropertyValue('--p-emerald-500'),
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-primary-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-red-400'),
          documentStyle.getPropertyValue('--p-emerald-400'),
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-primary-400')
        ]
      }
    ]
  };
};

const setChartOptions = (): ChartOptions => {
  const documentStyle = getDocumentStyle();
  const textColor = documentStyle.getPropertyValue('--p-primary-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
};

const setDoughnutOptions = (): ChartOptions => {
  const documentStyle = getDocumentStyle();
  const textColor = documentStyle.getPropertyValue('--p-primary-color');

  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 12
          }
        }
      }
    }
  };
};

const setPolarOptions = (): ChartOptions => {
  const documentStyle = getDocumentStyle();
  const textColor = documentStyle.getPropertyValue('--p-primary-color');

  return {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 12
          }
        }
      }
    }
  };
};

onMounted(() => {
  lineChartData.value = setLineChartData();
  barChartData.value = setBarChartData();
  doughnutChartData.value = setDoughnutChartData();
  polarChartData.value = setPolarChartData();
  chartOptions.value = setChartOptions();
  doughnutOptions.value = setDoughnutOptions();
  polarOptions.value = setPolarOptions();
});
</script>

<style scoped>
.page-container {
  padding: 1.5rem;
  overflow-y: scroll;
  width: 100%;
  box-sizing: border-box;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  min-width: 0;
}

.stat-card {
  grid-column: span 1;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.chart-card {
  grid-column: span 2;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}

.chart-large {
  grid-column: span 2;
}

.chart-medium {
  grid-column: span 1;
}

.chart-container {
  min-height: 20rem;
}

@media (max-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card {
    grid-column: span 1;
  }

  .chart-card {
    grid-column: span 2;
  }

  .chart-medium {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stat-card,
  .chart-card,
  .chart-large,
  .chart-medium {
    grid-column: span 1;
  }

  .page-container {
    padding: 1rem;
  }
}
</style>
