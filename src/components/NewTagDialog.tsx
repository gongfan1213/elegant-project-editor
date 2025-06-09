import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import styles from "@/styles/NewTagDialog.module.css";

interface NewTagDialogProps {
  onAddTag: (tag: string) => void;
}

const NewTagDialog = ({ onAddTag }: NewTagDialogProps) => {
  const [open, setOpen] = useState(false);
  const [tagName, setTagName] = useState("");

  const handleSubmit = () => {
    if (tagName.trim()) {
      onAddTag(tagName.trim());
      setTagName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={styles.triggerButton}>
          + 新增标签
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>新增标签</DialogTitle>
        </DialogHeader>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="tagName" className={styles.label}>
              标签名称
            </label>
            <Input
              id="tagName"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="请输入标签名称"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            创建
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTagDialog;
