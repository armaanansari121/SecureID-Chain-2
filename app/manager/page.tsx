// CheckpointOptions.tsx

import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CheckpointOptions: FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen pt-24">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Checkpoint Options
        </h1>
        <div className="flex justify-center space-x-8">
          <Card className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Add Checkpoint
              </h2>
              <a href="/manager/add-checkpoint" className="inline-block">
                <Button variant="outline" className="bg-blue-600 text-white">
                  Add Checkpoint
                </Button>
              </a>
            </div>
          </Card>
          <Card className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Checkpoint
              </h2>
              <a href="/manager/update-checkpoint" className="inline-block">
                <Button variant="outline" className="bg-blue-600 text-white">
                  Update Checkpoint
                </Button>
              </a>
            </div>
          </Card>
        </div>
        <div className="flex justify-center space-x-8 mt-8">
          <Card className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Checkpoints List
              </h2>
              <a href="/manager/checkpoints" className="inline-block">
                <Button variant="outline" className="bg-blue-600 text-white">
                  View Checkpoints List
                </Button>
              </a>
            </div>
          </Card>
          <Card className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                All Employees
              </h2>
              <a href="/manager/all-employee" className="inline-block">
                <Button variant="outline" className="bg-blue-600 text-white">
                  View All Employees
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CheckpointOptions;
