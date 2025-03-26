
import React from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SimulationLogsProps {
  logs: {id: number; message: string; type: 'success' | 'error' | 'info'}[];
}

export const SimulationLogs = ({ logs }: SimulationLogsProps) => {
  const { t } = useTranslation();
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      case 'error': return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-blue-500" />;
    }
  };

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{t('networkTools.testEnvironment')}</h4>
      <div className="h-[300px] overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
        {logs.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm p-4">
            {t('networkTools.simulationSystems')}
          </p>
        ) : (
          logs.map(log => (
            <div key={log.id} className="flex gap-2 items-start mb-2 text-sm">
              <div className="mt-0.5">{getLogIcon(log.type)}</div>
              <div>{log.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
