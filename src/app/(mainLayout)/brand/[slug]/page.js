import BrandContainer from "@/Components/Brand/index"

export async function generateMetadata({ params }) {
  
    // fetch data
    const brandData = await fetch(`${process.env.API_PROD_URL}brand/slug/${params?.slug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
      openGraph: {
        title: brandData?.meta_title,
        description: brandData?.meta_description,
        images: [brandData?.brand_meta_image?.original_url, []],
      },
    }
  }

const BrandPage = ({params}) => {
    return (
        <BrandContainer params={params?.slug}/>
    )
}

export default BrandPage