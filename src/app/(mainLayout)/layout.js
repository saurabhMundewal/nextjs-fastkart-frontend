import MainLayout from "@/Layout"

export default function RootLayout({ children}) {
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}
