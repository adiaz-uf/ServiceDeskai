import { IoCameraOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { LuSend } from "react-icons/lu";

import { Button } from "../../general-components/Button";
import MainLayout from "../../layouts/MainLayout";
import { Card, CardContent } from "../../general-components/Card";

export default function UploadPage() {
  return (
    <div>
        <MainLayout>
          <h1 className="text-ui-primary font font-semibold text-3xl">ServiceDeskAI</h1>
            <div className="flex justify-between mt-8 items-center">
              <h2 className="text-ui-primary font font-semibold text-2xl">Crear Reporte</h2>
              <div className="flex gap-2">

                {/* Buttons with icons for camera and upload */}
                <Button variant="outline" className="text-2xl !py-2">
                  <IoCameraOutline />
                </Button>
                <Button className="text-2xl !py-2 !px-3">
                  <FiUpload />
                </Button>
              </div>
            </div>

            {/* Placeholder for image content */}
            <Card className="mt-5">
              <CardContent>
              <div className="w-full aspect-square bg-ui-secondary rounded-md flex items-center justify-center">
                Image placeholder
              </div>
              </CardContent>
            </Card>
            <Card className="mt-5">
              <CardContent>
                <div className="w-full bg-ui-secondary rounded-md flex flex-col text-start justify-center">
                  <p className="mb-2">Describe el problema</p>
                  <textarea className="w-full h-24 p-2 border border-ui-primary resize-none rounded-md bg-ui-background" />
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="text-xl !py-2">
                      <IoCameraOutline />
                    </Button>
                    <Button  variant='outline' className="text-xl !py-2 !px-3">
                      <FiUpload />
                    </Button>
                    <Button className="text-xl !py-2 !px-3 ml-auto flex items-center gap-2">
                      Send <LuSend />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
        </MainLayout>
    </div>
  );
}