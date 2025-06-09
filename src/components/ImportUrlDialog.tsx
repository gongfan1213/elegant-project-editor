import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "lucide-react";
import styles from "@/styles/ImportUrlDialog.module.css";

interface ImportUrlDialogProps {
  onImport: (title: string, content: string) => void;
}

const ImportUrlDialog = ({ onImport }: ImportUrlDialogProps) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleImport = () => {
    if (url.trim()) {
      // 模拟从小红书URL导入内容
      const mockTitle = "小红书内容标题";
      const mockContent = "从小红书导入的内容...";
      onImport(mockTitle, mockContent);
      setUrl("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className={styles.triggerButton}>
          <Link size={12} className={styles.linkIcon} />
          导入URL
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>导入小红书内容</DialogTitle>
        </DialogHeader>
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="url" className={styles.label}>
              小红书链接
            </label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请粘贴小红书链接"
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleImport}>
            导入
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUrlDialog;
