import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import styles from "@/styles/ProjectManageDialog.module.css";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  lastModified: string;
}

interface ProjectManageDialogProps {
  projects: Project[];
  onDeleteProjects: (projectIds: string[]) => void;
}

const ProjectManageDialog = ({ projects, onDeleteProjects }: ProjectManageDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.map(p => p.id));
    }
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleDelete = () => {
    if (selectedProjects.length > 0) {
      onDeleteProjects(selectedProjects);
      setSelectedProjects([]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={styles.triggerButton}>
          管理项目
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>项目管理</DialogTitle>
        </DialogHeader>
        <div className={styles.contentContainer}>
          <div className={styles.headerActions}>
            <div className={styles.selectAllGroup}>
              <Checkbox
                checked={selectedProjects.length === projects.length && projects.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className={styles.selectAllText}>全选</span>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              disabled={selectedProjects.length === 0}
              onClick={handleDelete}
            >
              <Trash2 size={14} className={styles.deleteButton} />
              删除选中 ({selectedProjects.length})
            </Button>
          </div>
          
          <div className={styles.projectList}>
            {projects.map((project) => (
              <div key={project.id} className={styles.projectItem}>
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={() => handleSelectProject(project.id)}
                />
                <div className={styles.projectInfo}>
                  <h4 className={styles.projectTitle}>{project.title}</h4>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
                <span className={styles.projectDate}>{project.lastModified}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManageDialog;
