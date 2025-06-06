import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password:"",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
  };

  return (
    <div className="">
      <Card className="bg-portfolio-dark-card border-gray-800 hover-glow">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-portfolio-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-portfolio-teal"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-portfolio-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-portfolio-teal"
                required
              />
            </div>
           
            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-gradient-to-r from-portfolio-teal to-portfolio-blue hover:from-portfolio-teal/80 hover:to-portfolio-blue/80 text-white"
              size="lg"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
