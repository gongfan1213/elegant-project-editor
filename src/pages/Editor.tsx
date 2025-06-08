
import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Download, Copy, Trash2, MessageSquarePlus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ResizablePanels from "@/components/ResizablePanels";
import ImportUrlDialog from "@/components/ImportUrlDialog";
import MyIdeas from "@/components/MyIdeas";

type LeftPanelView = "drafts" | "ideas";
type RightPanelView = "current" | "history";

const Editor = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
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

  const [chatInput, setChatInput] = useState("");
  const [leftPanelView, setLeftPanelView] = useState<LeftPanelView>("drafts");
  const [rightPanelView, setRightPanelView] = useState<RightPanelView>("current");
  const [drafts, setDrafts] = useState([
    {
      id: "1",
      title: "iPhone 15 Pro深度评测",
      preview: "📱 iPhone 15 Pro深度评测来啦！今天给大家带来最新的iPhone 15 Pro全面评测...",
      time: "2024-06-06 14:30"
    },
    {
      id: "2",
      title: "iPhone 15 Pro上手体验", 
      preview: "🔥 拿到iPhone 15 Pro的第一时间，就忍不住要分享给大家这个使用体验...",
      time: "2024-06-05 16:20"
    },
    {
      id: "3",
      title: "iPhone 15 Pro vs iPhone 14 Pro对比",
      preview: "⚡ 很多朋友问iPhone 15 Pro相比14 Pro到底提升在哪里，今天就来...",
      time: "2024-06-04 10:15"
    }
  ]);

  const [aiChat, setAiChat] = useState([
    {
      type: "ai",
      message: "嗨，我来帮你优化这篇iPhone 15 Pro的评测文案，让它更加吸引人",
      time: "14:25"
    },
    {
      type: "user", 
      message: "我来帮你优化这篇iPhone 15 Pro评测文案，让它更具吸引力和可读性，我会从标题、结构和内容细节方面进行优化。",
      time: "14:26"
    },
    {
      type: "ai",
      message: "可以加一些更具体的数据对比吗？比如电池续航的具体小时数，相机的样张对比等。",
      time: "14:28"
    }
  ]);

  // Chat history for different sessions
  const [chatHistory] = useState([
    {
      id: "1",
      title: "iPhone 15 Pro评测优化",
      date: "2024-06-06",
      messages: aiChat
    },
    {
      id: "2", 
      title: "美妆内容策划",
      date: "2024-06-05",
      messages: [
        {
          type: "ai",
          message: "让我帮你策划夏日护肤的内容方向",
          time: "10:15"
        }
      ]
    }
  ]);

  useEffect(() => {
    // 如果是新建草稿且有内容参数，设置初始内容
    const initialContent = searchParams.get('content');
    if (id === 'new' && initialContent) {
      setContent(initialContent);
      setTitle("新建草稿");
    } else if (id === 'new') {
      setContent("");
      setTitle("新建草稿");
    }
  }, [id, searchParams]);

  const handleImportContent = (importedTitle: string, importedContent: string) => {
    setTitle(importedTitle);
    setContent(importedContent);
  };

  const handleSelectIdea = (ideaContent: string) => {
    setContent(ideaContent);
    setTitle("基于想法的新草稿");
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        type: "user" as const,
        message: chatInput,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setAiChat([...aiChat, newMessage]);
      setChatInput("");
    }
  };

  const handleNewDraft = () => {
    setTitle("新建草稿");
    setContent("");
  };

  const handleCopyDraft = (draftContent: string) => {
    navigator.clipboard.writeText(draftContent);
  };

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== draftId));
  };

  const handleNewChat = () => {
    setAiChat([]);
    setRightPanelView("current");
  };

  const renderLeftPanel = () => {
    if (leftPanelView === "ideas") {
      return (
        <MyIdeas 
          onSelectIdea={handleSelectIdea} 
          onBackToDrafts={() => setLeftPanelView("drafts")}
        />
      );
    }
    
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => setLeftPanelView("drafts")}
              >
                文本草稿
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLeftPanelView("ideas")}
              >
                我的想法
              </Button>
            </div>
            <ImportUrlDialog onImport={handleImportContent} />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
            onClick={handleNewDraft}
          >
            <Download size={16} className="mr-2" />
            新建草稿
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {drafts.map((draft, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm group">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-1 flex-1">{draft.title}</h4>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopyDraft(draft.preview)}
                    >
                      <Copy size={12} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={() => handleDeleteDraft(draft.id)}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">{draft.preview}</p>
                <span className="text-xs text-gray-400">{draft.time}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const centerPanel = (
    <div className="p-6 h-full flex flex-col">
      {/* Title row with save button */}
      <div className="mb-6 flex items-center justify-between">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold border-0 p-0 focus:ring-0 text-gray-900 flex-1 mr-4"
          placeholder="输入标题..."
        />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save size={16} className="mr-2" />
          保存
        </Button>
      </div>
      
      <Separator className="mb-6" />
      
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border-0 p-0 focus:ring-0 resize-none text-gray-700 leading-relaxed"
        placeholder="开始写作..."
      />
    </div>
  );

  const rightPanel = (
    <div className="flex flex-col h-full">
      {/* AI助手标题栏，带有新对话和历史记录图标 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">AI助手</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleNewChat}
            >
              <MessageSquarePlus size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setRightPanelView(rightPanelView === "history" ? "current" : "history")}
            >
              <History size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 flex flex-col">
        {rightPanelView === "current" ? (
          <>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {aiChat.map((message, index) => (
                <div key={index} className={`${message.type === 'ai' ? 'bg-primary/10' : 'bg-gray-50'} rounded-lg p-3`}>
                  <p className="text-sm text-gray-700 leading-relaxed">{message.message}</p>
                  <span className="text-xs text-gray-500 mt-2 block">{message.time}</span>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input 
                  placeholder="与AI对话..." 
                  className="flex-1" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSendMessage}>
                  发送
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {chatHistory.map((session) => (
                <Card key={session.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900">{session.title}</h4>
                      <History size={14} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{session.date}</p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {session.messages[0]?.message || "暂无消息"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">N</span>
              </div>
              <span className="font-semibold text-gray-900">Nova</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="h-[calc(100vh-140px)]">
          <ResizablePanels
            leftPanel={renderLeftPanel()}
            centerPanel={centerPanel}
            rightPanel={rightPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
