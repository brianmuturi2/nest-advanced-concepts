import { ContextId, ContextIdFactory, ContextIdResolver, ContextIdResolverFn, ContextIdStrategy, HostComponentInfo } from "@nestjs/core";
import {Request} from 'express';

export class AggregateByTenentContextIdStrategy implements ContextIdStrategy {

    private readonly tenants = new Map<string, ContextId>();

    attach(contextId: ContextId, request: Request): ContextIdResolverFn | ContextIdResolver | undefined {
        const tenantId = request.headers['x-tenant-id'] as string;
        if (!tenantId) {
            // OR log error depending on what we want to accomplish
            return () => contextId
        }

        let tenantSubTreeId: ContextId;
        if (this.tenants.has(tenantId)) {
            tenantSubTreeId = this.tenants.get(tenantId);
        } else {
            tenantSubTreeId = ContextIdFactory.create();
            this.tenants.set(tenantId, tenantSubTreeId);
            setTimeout(() => this.tenants.delete(tenantId), 3000);
        }

        return {
            payload: {tenantId},
            resolve: (info: HostComponentInfo) => info.isTreeDurable ? tenantSubTreeId : contextId
        }
    }
}