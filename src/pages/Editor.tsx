
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Save, Bot, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Editor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("iPhone 15 Pro深度评测");
  const [content, setContent] = useState(`📱 iPhone 15 Pro深度评测来啦！

今天给大家带来最新的iPhone 15 Pro全面评测，作为科技博主，我已经使用了两周时间，现在来分享一下真实体验～

😊 外观设计
• 钛金属边框颜值真的没话说
• 重量减轻明显，握持感更好  
• 新的蓝色钛金属颜色超级好看

📷 相机系统
• 48MP主摄升级效果明显
• 夜景拍摄效果极佳
• 人像模式更加自然

⚡ 性能表现
• A17 Pro芯片性能强劲
• 游戏体验流畅度满分
• 续航相比上代有提升

😋 购买建议
如果你是从iPhone 12及以下升级，强烈推荐！如果是iPhone 14 Pro用户，可以再等等～

#iPhone15Pro #科技评测 #数码博主 #手机推荐`);

  const suggestions = [
    {
      title: "iPhone 15 Pro深度评测",
      preview: "📱 iPhone 15 Pro深度评测来啦！今天给大家带来最新的iPhone 15 Pro全面评测..."
    },
    {
      title: "iPhone 15 Pro上手体验", 
      preview: "🔥 拿到iPhone 15 Pro的第一时间，就忍不住要分享给大家这个使用体验..."
    },
    {
      title: "iPhone 15 Pro vs iPhone 14 Pro对比",
      preview: "⚡ 很多朋友问iPhone 15 Pro相比14 Pro到底提升在哪里，今天就来..."
    }
  ];

  const aiChat = [
    {
      type: "ai",
      message: "嗨，我化身一下iPhone 15 Pro的评测文案，让它更加吸引人",
      time: "14:25"
    },
    {
      type: "user", 
      message: "我来帮你优化这篇iPhone 15 Pro评测文案，让它更具吸引力和可读性，我会优化标题、结构和内容细节方面进行优化。",
      time: "14:26"
    },
    {
      type: "ai",
      message: "可以加一些更具体的数据对比吗？",
      time: "14:28"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/my-projects">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft size={16} className="mr-2" />
                返回
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="font-semibold text-gray-900">Nova</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Copy size={16} className="mr-2" />
              复制
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save size={16} className="mr-2" />
              保存
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Bot size={16} className="mr-2" />
              AI助手
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Document List */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">文本草稿</h3>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
                <Download size={16} className="mr-2" />
                新建草稿
              </Button>
            </div>

            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm">
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{suggestion.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-3">{suggestion.preview}</p>
                    <span className="text-xs text-gray-400 mt-2 block">2024-06-06 14:30</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Editor */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-0 p-0 focus:ring-0 text-gray-900"
                placeholder="输入标题..."
              />
            </div>
            
            <Separator className="mb-6" />
            
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[500px] border-0 p-0 focus:ring-0 resize-none text-gray-700 leading-relaxed"
              placeholder="开始写作..."
            />
          </div>

          {/* Right Sidebar - AI Chat */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">AI助手</h3>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {aiChat.map((message, index) => (
                <div key={index} className={`${message.type === 'ai' ? 'bg-blue-50' : 'bg-gray-50'} rounded-lg p-3`}>
                  <p className="text-sm text-gray-700 leading-relaxed">{message.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{message.time}</span>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input placeholder="与AI对话..." className="flex-1" />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  发送
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
