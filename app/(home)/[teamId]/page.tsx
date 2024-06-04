import Records from './_components/records'
import ReportRecords from './_components/report-records'
import TrafficSources from './_components/traffic-sources'
import UsersActivity from './_components/users-activity'

export default async function TeamId() {
  return (
    <main className='px-4 py-8'>
      <div className='mx-auto grid max-w-screen-desktop grid-cols-1 gap-6 mid:grid-cols-10'>
        {/* REPORT OF RECORDS */}
        <ReportRecords className='col-span-1 mid:col-span-7' />

        {/* TRAFFIC SOURCES */}
        <TrafficSources className='col-span-1 mid:col-span-3' />

        {/* RECORDS  */}
        <Records className='col-span-1 mid:col-span-7' />

        {/* USERS ACTIVITY  */}
        <UsersActivity className='col-span-1 mid:col-span-3' />
      </div>
    </main>
  )
}
