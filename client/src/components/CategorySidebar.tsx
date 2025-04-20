import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CategorySidebar() {
  const { categories, activeCategory, setActiveCategory } = useShop();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="category-item">
              <Button
                variant={activeCategory === category ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeCategory !== category
                    ? "text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
