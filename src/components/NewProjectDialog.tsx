
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} className="mr-2" />
          新增项目
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增项目</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              项目标题
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入项目标题"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
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
          <div className="space-y-2">
            <label className="text-sm font-medium">
              标签选择
            </label>
            {!showNewTagInput ? (
              <div className="space-y-2">
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
                  className="w-full border-dashed"
                >
                  + 创建新标签
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
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
        <div className="flex justify-end space-x-2">
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
