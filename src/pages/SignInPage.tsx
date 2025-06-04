import React from 'react';
import Button from '../components/ui/Button';

const SignInPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-text-dark mb-6 text-center">Sign In</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-text-dark mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-text-dark mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-text-medium">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-accent hover:underline">
              Forgot password?
            </a>
          </div>
          
          <Button variant="primary" size="md" type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-text-medium">
            Don't have an account?{' '}
            <a href="#" className="text-accent hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;