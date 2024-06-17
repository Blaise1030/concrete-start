import { BackgroundPattern } from "~/components/common/background-pattern";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { BarChart } from "~/components/ui/charts";

export default function MainPage() {
  return (
    <>
      <DashboardHeader />
      <div class="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 bg-transparent px-4 p-8 mt-10">
        <BarChartDemo />
        <BarChartDemo />
      </div>
    </>
  );
}

function BarChartDemo() {
  const chartData = {
    labels: [
      "Amphibians",
      "Birds",
      "Crustaceans",
      "Ferns",
      "Arachnids",
      "Corals",
      "Algae",
    ],
    datasets: [
      {
        label: "Number of threatened species",
        data: [2488, 1445, 734, 281, 251, 232, 98],
      },
    ],
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent class="max-w-full h-60">
        <BarChart data={chartData} />
      </CardContent>
    </Card>
  );
}

{
  /* <button
  onClick={async () => {
    await api.auth.signout.mutate();
    window.location.href = "/";
  }}
>
  Sign out
</button>; */
}
