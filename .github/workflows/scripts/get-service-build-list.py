import os
import json
from pathlib import Path
from typing import List
root_folder=os.getenv('GITHUB_WORKSPACE',Path(__file__).parents[3])
output_file=os.getenv('OUPTUT_PATH',os.path.join(root_folder,'service_build_list.json'))
helm_services_folder=os.getenv('HELM_SERVICES_FOLDER',os.path.join(root_folder,'helm/charts/services'))
packages_folder=os.getenv('PACKAGES_FOLDER',os.path.join(root_folder,'packages'))
#changed_folders=["amplication-cli", "amplication-client", "amplication-container-builder", "amplication-data", "amplication-data-service-generator", "amplication-deployer", "amplication-design-system", "amplication-scheduler", "amplication-server"]
changed_files=os.getenv('CHANGED_FILES')

print(f"root_folder: {root_folder}")
print(f"output_file: {output_file}")
print(f"helm_services_folder: {helm_services_folder}")
print(f"packages_folder: {packages_folder}")
print(f"changed_files: {changed_files}")

def is_service(service_list,service_name) -> bool:
  return service_name in service_list

def dependet_services(package_name) -> List[str]:
    services=[]
    npm_package_name=package_name.replace("-","/",1)
    for service in all_services:
        package_json=f"{packages_folder}/{service}/package.json"
        with open(package_json, 'r') as file:
            depencies = file.read().replace('\n', '')
        if f"\"@{npm_package_name}\":" in depencies:
            print(f"The service {service} depends on package {npm_package_name}, will build")
            services.append(service)
    return services

def get_changed_folders():
    if not changed_files:
        print('no changed files')
    else:
        changed_folders=[]
        for changed_file in changed_files:
            changed_folders.append(changed_file.split('/')[1])
    print(f"changed_folders: {changed_folders}")
    return changed_folders

service_build_list=[]
all_services=next(os.walk(helm_services_folder))[1]
changed_folders=get_changed_folders()
for changed_folder in changed_folders:
    if is_service(all_services,changed_folder):
        if changed_folder not in service_build_list:
            service_build_list.append(changed_folder)
    else:
        services=dependet_services(changed_folder)
        for service in services:
            if service not in service_build_list:
                service_build_list.append(service)


print(f"Will build the follwoing services: {service_build_list}")
with open(output_file, 'w') as outfile:
    json.dump(service_build_list, outfile)
