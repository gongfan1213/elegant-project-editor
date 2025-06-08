
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const projects = [
    {
      title: "爆款美妆种草文案",
      content: "通过AI生成的美妆产品推荐文案，专业分析产品成分和使用效果，结合个人体验分享，打造真实可信的种草内容。从产品选择到使用心得，每一个细节都经过精心打磨，让读者能够真切感受到产品的魅力。无论是日常妆容还是特殊场合，都能找到最适合的美妆方案。",
      category: "美妆",
      color: "text-yellow-600 bg-yellow-50"
    },
    {
      title: "科技产品评测",
      content: "深度AI生成的手机评测内容，从外观设计到性能测试，从拍照效果到续航表现，全方位解析最新科技产品。采用专业的测试方法和客观的评价标准，为消费者提供最有价值的购买参考。不仅关注产品本身，更从用户实际使用场景出发，给出最贴心的建议。",
      category: "科技",
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "旅行攻略分享",
      content: "AI助力创作的三亚旅行攻略，从行程规划到住宿推荐，从美食探索到景点打卡，每一个环节都经过精心安排。结合当地文化特色和季节变化，为游客提供最实用的旅行指南。不仅有详细的路线规划，更有贴心的旅行小贴士，让每一次旅行都成为难忘的回忆。",
      category: "旅行",
      color: "text-green-600 bg-green-50"
    },
    {
      title: "职场干货分享",
      content: "AI生成的职场成长建议，涵盖求职技巧、工作方法、人际关系、职业规划等多个方面。从新人入职到资深员工晋升，每个职场阶段都有对应的成长策略。结合真实案例和实用工具，帮助职场人士提升工作效率，实现职业目标，在竞争激烈的职场中脱颖而出。",
      category: "职场",
      color: "text-purple-600 bg-purple-50"
    },
  ];

  const handleStartCreating = () => {
    if (inputValue.trim()) {
      // 跳转到编辑器并传递初始内容
      navigate(`/editor/new?content=${encodeURIComponent(inputValue.trim())}`);
    } else {
      navigate('/editor/new');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStartCreating();
    }
  };

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
                onKeyPress={handleKeyPress}
                placeholder="将你的想法转化为精彩内容 - 从这里开始"
                className="flex-1 border-0 focus:ring-0 text-lg py-6 px-4"
              />
              <Button 
                onClick={handleStartCreating}
                className="m-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-3"
              >
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            用Nova创作精彩内容
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-semibold text-gray-900 flex-1">
                      {project.title}
                    </CardTitle>
                    <Badge className={`px-3 py-1 text-sm font-medium ${project.color} ml-4`}>
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {project.content}
                  </p>
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
