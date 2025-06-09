import { useState } from "react";
import { Copy, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import styles from "@/styles/MyIdeas.module.css";

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
        time: new Date().toLocaleString('zh-CN', { 
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
    <div className={styles.container}>
      <div className={styles.header}>
        {onBackToDrafts && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToDrafts}
            className={styles.backButton}
          >
            <ArrowLeft size={16} />
          </Button>
        )}
        <h3 className={styles.title}>我的想法</h3>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputContainer}>
          <Textarea
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="记录你的创作想法..."
            className={styles.textarea}
          />
          <Button 
            onClick={handleSaveIdea}
            className={styles.saveButton}
            disabled={!newIdea.trim()}
          >
            保存想法
          </Button>
        </div>
      </div>

      <div className={styles.historySection}>
        <h4 className={styles.historyTitle}>历史想法</h4>
        {ideas.map((idea) => (
          <Card key={idea.id} className={styles.ideaCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.actionButtons}>
                <div className={styles.buttonGroup}>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={styles.actionButton}
                    onClick={() => handleCopyIdea(idea.content)}
                  >
                    <Copy size={12} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={styles.actionButton}
                    onClick={() => handleDeleteIdea(idea.id)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <p 
                className={styles.ideaContent}
                onClick={() => onSelectIdea(idea.content)}
              >
                {idea.content}
              </p>
              <span className={styles.ideaTime}>{idea.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyIdeas;
