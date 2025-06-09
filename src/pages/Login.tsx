import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import styles from "@/styles/Login.module.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert("密码不匹配！");
      return;
    }

    if (isLogin) {
      console.log("登录:", { email, password });
      // 这里添加登录逻辑
    } else {
      console.log("注册:", { email, password });
      // 这里添加注册逻辑
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span className={styles.logoText}>N</span>
            </div>
          </div>
          <CardTitle className={styles.title}>
            {isLogin ? "登录到 Nova" : "注册 Nova 账户"}
          </CardTitle>
          <p className={styles.subtitle}>
            {isLogin ? "欢迎回来！请登录您的账户" : "创建新账户开始您的创作之旅"}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="请输入您的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {!isLogin && (
              <div className={styles.formGroup}>
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            
            <Button type="submit" className={styles.submitButton}>
              {isLogin ? "登录" : "注册"}
            </Button>
          </form>
          
          <div className={styles.switchContainer}>
            <p className={styles.switchText}>
              {isLogin ? "还没有账户？" : "已有账户？"}
              <Button
                variant="link"
                className={styles.switchButton}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "立即注册" : "立即登录"}
              </Button>
            </p>
          </div>
          
          <div className={styles.backContainer}>
            <Link to="/">
              <Button variant="ghost" className={styles.backButton}>
                返回首页
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
