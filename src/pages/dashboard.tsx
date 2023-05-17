import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiReload
} from '@mdi/js'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState } from 'react'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import CardBoxWidget from '../components/CardBoxWidget'
import ChartLineSample from '../components/ChartLineSample'
import { sampleChartData } from '../components/ChartLineSample/config'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { TeacherTable } from '../components/TeacherTable'
import { getPageTitle } from '../config'
import { useTeacher } from '../hooks/useTeacher'
import LayoutAuthenticated from '../layouts/Authenticated'

const Dashboard = () => {
  const { data, error, isLoading } = useTeacher()

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="نگاه اجمالی" main>
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="success"
            icon={mdiAccountMultiple}
            iconColor="success"
            number={512}
            label="موسسات"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="danger"
            icon={mdiCartOutline}
            iconColor="info"
            number={7770}
            numberPrefix=""
            label="دوره ها"
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="up"
            trendColor="success"
            icon={mdiChartTimelineVariant}
            iconColor="danger"
            number={256}
            numberSuffix=""
            label="مدارک تایید شده"
          />
        </div>


        <SectionTitleLineWithButton icon={mdiChartPie} title="آمارها">
          <BaseButton icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="اساتید" />

        <CardBox hasTable>
          <TeacherTable clients={data} isLoading={isLoading} error={error} />
        </CardBox>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
