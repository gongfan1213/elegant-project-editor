
import { useState } from "react";
import { Copy, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface MyIdeasProps {
  onSelectIdea: (idea: string) => void;
  onBackToDrafts?: () => void;
}

const MyIdeas = ({ onSelectIdea, onBackToDrafts }: MyIdeasProps) => {
  const [ideas, setIdeas] = useState([
    {
      id: "1",
      content: "今天的妆容分享，使用了新买的口红色号",
      time: "2024-06-06 14:30"
    },
    {
      id: "2", 
      content: "iPhone 15 Pro的拍照功能真的很棒，特别是夜景模式",
      time: "2024-06-05 16:20"
    }
  ]);
  
  const [newIdea, setNewIdea] = useState("");

  const handleSaveIdea = () => {
    if (newIdea.trim()) {
      const idea = {
        id: Date.now().toString(),
        content: newIdea.trim(),
        time: new Date().toLocaleTimeString('zh-CN', { 
          year: 'numeric',
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setIdeas([idea, ...ideas]);
      setNewIdea("");
    }
  };

  const handleCopyIdea = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== ideaId));
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">我的想法</h3>
          {onBackToDrafts && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToDrafts}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} className="mr-1" />
              返回草稿
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <Textarea
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="记录你的创作想法..."
            className="resize-none"
            rows={3}
          />
          <Button 
            onClick={handleSaveIdea}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={!newIdea.trim()}
          >
            保存想法
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {ideas.map((idea) => (
          <Card key={idea.id} className="cursor-pointer hover:shadow-md transition-shadow border-0 shadow-sm group">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0"
                    onClick={() => handleCopyIdea(idea.content)}
                  >
                    <Copy size={12} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0"
                    onClick={() => handleDeleteIdea(idea.id)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <p 
                className="text-sm text-gray-700 line-clamp-3 mb-2 cursor-pointer"
                onClick={() => onSelectIdea(idea.content)}
              >
                {idea.content}
              </p>
              <span className="text-xs text-gray-400">{idea.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyIdeas;
