
import { useState } from "react";
import { ArrowRight, Star, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

const Index = () => {
  const [inputValue, setInputValue] = useState("");

  const categories = [
    { name: "美妆", rating: 8.5, icon: Star, color: "text-yellow-500" },
    { name: "科技", rating: 12.3, icon: Zap, color: "text-blue-500" },
    { name: "旅行", rating: 6.7, icon: TrendingUp, color: "text-green-500" },
    { name: "职场", rating: 9.8, icon: Users, color: "text-purple-500" },
  ];

  const projects = [
    {
      title: "爆款美妆种草文案",
      description: "通过AI生成的美妆产品推荐文案，获得10w+点赞",
      views: "10.2w",
      interactive: true,
      category: "美妆",
      color: "text-yellow-600 bg-yellow-50"
    },
    {
      title: "科技产品评测",
      description: "深度AI生成的手机评测内容，专业且吸引人",
      views: "15.6w",
      interactive: true,
      category: "科技",
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "旅行攻略分享",
      description: "AI助力创作的三亚旅行攻略，实用性极强",
      views: "8.9w",
      interactive: true,
      category: "旅行",
      color: "text-green-600 bg-green-50"
    },
    {
      title: "职场干货分享",
      description: "AI生成的职场成长建议，收藏量破万",
      views: "12.4w",
      interactive: true,
      category: "职场",
      color: "text-purple-600 bg-purple-50"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Nova</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            将你的想法转化为精彩内容 - 从这里开始
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <div className="flex items-center justify-center w-12 h-12 text-gray-400">
                <span className="text-2xl">+</span>
              </div>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="将你的想法转化为精彩内容 - 从这里开始"
                className="flex-1 border-0 focus:ring-0 text-lg py-6 px-4"
              />
              <Button className="m-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full px-8 py-3">
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            用Nova开始创作
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-2">
                    <category.icon className={`w-8 h-8 ${category.color}`} />
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {category.rating}w
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.color}`}>
                      {project.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <TrendingUp size={14} className="mr-1" />
                        {project.views}
                      </span>
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        互动
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
