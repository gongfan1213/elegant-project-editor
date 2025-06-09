import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import styles from "@/styles/NewProjectDialog.module.css";

interface NewProjectDialogProps {
  onAddProject: (title: string, description: string, category: string) => void;
  availableTags: string[];
  onAddTag: (tag: string) => void;
}

const NewProjectDialog = ({ onAddProject, availableTags, onAddTag }: NewProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);

  const handleSubmit = () => {
    if (title.trim() && category) {
      onAddProject(title, description, category);
      setTitle("");
      setDescription("");
      setCategory("");
      setOpen(false);
    }
  };

  const handleAddNewTag = () => {
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setCategory(newTagName.trim());
      setNewTagName("");
      setShowNewTagInput(false);
    }
  };

  const filteredTags = availableTags.filter(tag => tag !== "全部");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={styles.triggerButton}>
          <Plus size={16} className={styles.plusIcon} />
          新增项目
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>新增项目</DialogTitle>
        </DialogHeader>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              项目标题
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入项目标题"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description" className={styles.label}>
              项目描述
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="请输入项目描述"
              rows={3}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              标签选择
            </label>
            {!showNewTagInput ? (
              <div className={styles.tagSelectContainer}>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择标签" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowNewTagInput(true)}
                  className={styles.newTagButton}
                >
                  + 创建新标签
                </Button>
              </div>
            ) : (
              <div className={styles.newTagInputContainer}>
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="输入新标签名称"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNewTag()}
                />
                <Button onClick={handleAddNewTag} size="sm">
                  添加
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowNewTagInput(false);
                    setNewTagName("");
                  }} 
                  size="sm"
                >
                  取消
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !category}>
            创建
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
