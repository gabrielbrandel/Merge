import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const chartLabels = data.map((item) => item.mes)

  const mergesData = data.map((item) => item.merges)

  const bugDeImpactoData = data.map((item) => item.bugDeImpacto)
  const bugSemImpactoData = data.map((item) => item.bugSemImpacto)
  const bugErroInternoData = data.map((item) => item.erroInterno)
  const alteracaoData = data.map((item) => item.alteracao)
  const outrosData = data.map((item) => item.outros)

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: chartLabels,
          datasets: [
            // {
            //   label: 'Merges',
            //   backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
            //   borderColor: getStyle('--cui-info'),
            //   pointHoverBackgroundColor: getStyle('--cui-info'),
            //   borderWidth: 2,
            //   data: mergesData,
            //   fill: true,
            // },
            {
              label: 'Bug de Impacto',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 2,
              data: bugDeImpactoData,
            },
            {
              label: 'Bug Sem Impacto',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-warning'),
              pointHoverBackgroundColor: getStyle('--cui-warning'),
              borderWidth: 2,
              data: bugSemImpactoData,
            },
            {
              label: 'Erro Interno',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-primary'),
              pointHoverBackgroundColor: getStyle('--cui-primary'),
              borderWidth: 2,
              data: bugErroInternoData,
            },
            {
              label: 'Alteração do Sistema',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: alteracaoData,
            },
            {
              label: 'Outros',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: outrosData,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
