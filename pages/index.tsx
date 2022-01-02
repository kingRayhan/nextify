import FeaturedCategory from "@/components/FeaturedCategory";
import AppLayout from "@/components/layouts/AppLayout";
import PromoSection from "@/components/PromoSection";
import ProductList from "@/components/ProductList";
import ProductList2 from "@/components/ProductList2";

const HomePage = () => {
  return (
    <AppLayout>
      <ProductList2 />
      <ProductList />
      <FeaturedCategory />
      <PromoSection />
    </AppLayout>
  );
};

export default HomePage;
