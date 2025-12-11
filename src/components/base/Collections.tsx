import { ArrowRight, Leaf } from "lucide-react";
import { cn } from "../../lib/utils";

const Collections = () => {
  return (
    <section
      id="collections"
      className="w-full text-black bg-gradient-to-br from-rose-200 via-indigo-200 to-yellow-200 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-3 items-center justify-center mb-12">
          <Leaf size={36} className="text-green-400" />
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 ">
            Our Collection
          </h2>
          <Leaf size={36} className="text-green-400" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div
            className={cn(
              "group/card cursor-pointer overflow-hidden relative h-96 rounded-xl shadow-2xl max-w-sm mx-auto bg-cover bg-center flex flex-col justify-end p-6",
              "bg-[url('https://imgs.search.brave.com/CGH8NvzHpp7J7HYA05SN9rEKjaGF_KECB8KpCZ9mMQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/OTM5MDg4MC9waG90/by9kYW5nZXJzLW9m/LWxvdy1lYXJ0aC1v/cmJpdC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9SnQwWWNl/cDVhdVF4QXJiSXBX/bmN6Z2NrMlJ6c2tf/VzA3d1dPMlNNUHBq/QT0')]"
            )}
          >
            <div className="absolute inset-0 bg-black/50 group-hover/card:bg-black/60 transition" />
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-white">
                Low Earth Orbit Zone
              </h3>
              <p className="text-gray-200 mt-2 text-sm">
                Home to thousands of satellites scanning Earth every second.
              </p>
              <a
                href="#"
                className="flex items-center gap-2 mt-4 text-yellow-300 font-medium hover:underline"
              >
                Explore More <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div
            className={cn(
              "group/card cursor-pointer overflow-hidden relative h-96 rounded-xl shadow-2xl max-w-sm mx-auto bg-cover bg-center flex flex-col justify-end p-6",
              "bg-[url('https://imgs.search.brave.com/BZCrHXWaQAeeHoYSPx2trIPxiDU3mu3ywuKpgao6kZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGV3ZXRyb24uY29t/L2FwcC91cGxvYWRz/LzIwMjQvMTAvaGVh/ZGVyLWdwcy1zYXRl/bGxpdGUtbmF2aWdh/dGlvbi5qcGc')]"
            )}
          >
            <div className="absolute inset-0 bg-black/50 group-hover/card:bg-black/60 transition" />
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-white">
                Medium Earth Orbit Zone
              </h3>
              <p className="text-gray-200 mt-2 text-sm">
                Navigation and timing satellites that guide the world.
              </p>
              <a
                href="#"
                className="flex items-center gap-2 mt-4 text-yellow-300 font-medium hover:underline"
              >
                Explore More <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div
            className={cn(
              "group/card cursor-pointer overflow-hidden relative h-96 rounded-xl shadow-2xl max-w-sm mx-auto bg-cover bg-center flex flex-col justify-end p-6",
              "bg-[url('https://imgs.search.brave.com/YwOP2Ph0NXB7Ny8S3JaMaxugJAoCvR1hlZsHbjvHwPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY2/NzI3OTM4L3Bob3Rv/L2NvbW11bmljYXRp/b24tc2F0ZWxsaXRl/LW9yYml0aW5nLWVh/cnRoLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1kUU42NDlD/U19WR2txVW11dEZO/aFJtbHRpbDl1SEZ2/RElaUjN0dGtlSHRj/PQ')]"
            )}
          >
            <div className="absolute inset-0 bg-black/50 group-hover/card:bg-black/60 transition" />
            <div className="relative z-10">
              <h3 className="font-bold text-2xl text-white">
                Geostationary Belt
              </h3>
              <p className="text-gray-200 mt-2 text-sm">
                Weather and communication satellites watching Earth from 36,000
                km away.
              </p>
              <a
                href="#"
                className="flex items-center gap-2 mt-4 text-yellow-300 font-medium hover:underline"
              >
                Explore More <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
