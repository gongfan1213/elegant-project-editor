import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import styles from "@/styles/Index.module.css";

const Index = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const projects = [
    {
      title: "爆款美妆种草文案",
      content: "通过AI生成的美妆产品推荐文案，专业分析产品成分和使用效果，结合个人体验分享，打造真实可信的种草内容。从产品选择到使用心得，每一个细节都经过精心打磨，让读者能够真切感受到产品的魅力。无论是日常妆容还是特殊场合，都能找到最适合的美妆方案。",
      category: "美妆",
      color: styles.categoryYellow
    },
    {
      title: "科技产品评测",
      content: "深度AI生成的手机评测内容，从外观设计到性能测试，从拍照效果到续航表现，全方位解析最新科技产品。采用专业的测试方法和客观的评价标准，为消费者提供最有价值的购买参考。不仅关注产品本身，更从用户实际使用场景出发，给出最贴心的建议。",
      category: "科技",
      color: styles.categoryBlue
    },
    {
      title: "旅行攻略分享",
      content: "AI助力创作的三亚旅行攻略，从行程规划到住宿推荐，从美食探索到景点打卡，每一个环节都经过精心安排。结合当地文化特色和季节变化，为游客提供最实用的旅行指南。不仅有详细的路线规划，更有贴心的旅行小贴士，让每一次旅行都成为难忘的回忆。",
      category: "旅行",
      color: styles.categoryGreen
    },
    {
      title: "职场干货分享",
      content: "AI生成的职场成长建议，涵盖求职技巧、工作方法、人际关系、职业规划等多个方面。从新人入职到资深员工晋升，每个职场阶段都有对应的成长策略。结合真实案例和实用工具，帮助职场人士提升工作效率，实现职业目标，在竞争激烈的职场中脱颖而出。",
      category: "职场",
      color: styles.categoryPurple
    },
  ];

  const handleStartCreating = () => {
    if (inputValue.trim()) {
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
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Nova</h1>
          <p className={styles.subtitle}>
            将你的想法转化为精彩内容 - 从这里开始
          </p>
          
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <div className={styles.searchIcon}>
                <span className={styles.searchIconText}></span>
              </div>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="将你的想法转化为精彩内容 - 从这里开始"
                className={styles.searchInput}
              />
              <Button 
                onClick={handleStartCreating}
                className={styles.searchButton}
              >
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        <section>
          <h2 className={styles.sectionTitle}>
            用Nova创作精彩内容
          </h2>
          
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <Card key={index} className={styles.projectCard}>
                <CardHeader>
                  <div className={styles.projectHeader}>
                    <CardTitle className={styles.projectTitle}>
                      {project.title}
                    </CardTitle>
                    <Badge className={`${styles.projectBadge} ${project.color}`}>
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={styles.projectContent}>
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
